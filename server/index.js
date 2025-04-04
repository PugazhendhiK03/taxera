require('dotenv').config();
const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();

// ======================
// Database Setup (SQLite)
// ======================
const dbPath = process.env.SQLITE_DB || path.join(__dirname, 'taxera.db');
const db = new Database(dbPath);

// Initialize database with users table
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('user', 'admin')) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// User functions
const User = {
  findOne: (email) => db.prepare('SELECT * FROM users WHERE email = ?').get(email),
  create: (userData) => {
    const stmt = db.prepare(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
    );
    const info = stmt.run(
      userData.name,
      userData.email,
      userData.password,
      userData.role || 'user'
    );
    return { id: info.lastInsertRowid, ...userData };
  },
  findById: (id) => db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(id),
  count: () => db.prepare('SELECT COUNT(*) as count FROM users').get().count,
  getAll: () => db.prepare('SELECT id, name, email, role FROM users').all()
};

// Initialize admin account if none exists
function initializeAdminAccount() {
  const adminEmail = 'cs.taxera@gmail.com';
  const adminExists = User.findOne(adminEmail);
  
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('ManiMuruganAdmin', 10);
    User.create({
      name: 'Mani Murugan',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Initial admin account created');
  }
}

// ======================
// Environment Validation
// ======================
const requiredEnvVars = ['JWT_SECRET', 'PORT', 'ALLOWED_ORIGINS'];
requiredEnvVars.forEach(env => {
  if (!process.env[env]) {
    console.error(`Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

// ======================
// Middleware Setup
// ======================
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.set('trust proxy', 1);

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later'
});

// ======================
// Authentication Middleware
// ======================
const protect = (roles = []) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = User.findById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

// ======================
// API Routes
// ======================
app.use('/api/', apiLimiter);

// Register Route
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (User.findOne(email)) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: parseInt(process.env.COOKIE_EXPIRES_IN || '3600000')
    });

    res.status(201).json({ 
      success: true,
      redirectTo: '/dashboard',
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne(email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: parseInt(process.env.COOKIE_EXPIRES_IN || '3600000')
    });

    res.json({ 
      success: true,
      redirectTo: user.role === 'admin' ? '/admin/dashboard' : '/dashboard',
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Dashboard Route
app.get('/api/dashboard', protect(), (req, res) => {
  try {
    // Here you can add any dashboard-specific data you want to return
    res.json({
      success: true,
      user: req.user,
      dashboardData: {
        // Add any dashboard data here
        welcomeMessage: `Welcome to your dashboard, ${req.user.name}!`,
        lastLogin: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
});

// ======================
// Other Routes
// ======================
app.get('/api/user', protect(), (req, res) => {
  res.json(req.user);
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, redirectTo: '/login' });
});

app.get('/api/admin/users', protect(['admin']), (req, res) => {
  try {
    const users = User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ======================
// Production Setup
// ======================
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
  
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'UP',
      timestamp: new Date() 
    });
  });
}

// Client Routing
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  } else {
    res.status(404).json({ message: 'Route not found' });
  }
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// ======================
// Server Start
// ======================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeAdminAccount();
});