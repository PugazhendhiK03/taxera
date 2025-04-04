require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
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
const db = new sqlite3.Database('./taxera.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
  
  // Create users table and add admin account
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Add admin account if it doesn't exist
    const adminEmail = 'cs.taxera@gmail.com';
    db.get(`SELECT id FROM users WHERE email = ?`, [adminEmail], (err, row) => {
      if (!row) {
        const adminName = 'Mani Murugan';
        const adminPassword = 'ManiMuruganAdmin';
        const hashedPassword = bcrypt.hashSync(adminPassword, 12);
        
        db.run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, 
          [adminName, adminEmail, hashedPassword, 'admin'], 
          (err) => {
            if (err) {
              console.error('Error creating admin account:', err);
            } else {
              console.log('Admin account created successfully');
            }
          });
      }
    });
  });
});

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

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      db.get(`SELECT * FROM users WHERE id = ?`, [decoded.userId], (err, user) => {
        if (err || !user) {
          return res.status(401).json({ message: 'User not found' });
        }

        if (roles.length && !roles.includes(user.role)) {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }

        req.user = user;
        next();
      });
    });
  };
};

// ======================
// API Routes
// ======================
app.use('/api/', apiLimiter);

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.get(`SELECT id FROM users WHERE email = ?`, [email], (err, row) => {
    if (row) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, 
      [name, email, hashedPassword], 
      function(err) {
        if (err) {
          console.error('Registration error:', err);
          return res.status(500).json({ message: 'Registration failed' });
        }

        const token = jwt.sign(
          { userId: this.lastID, role: 'user' },
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
          user: { 
            id: this.lastID, 
            name, 
            email, 
            role: 'user' 
          } 
        });
      });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
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
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  });
});

// ======================
// Other Routes
// ======================
app.get('/api/user', protect(), (req, res) => {
  res.json(req.user);
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/admin', protect(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
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
});