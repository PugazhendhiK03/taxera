require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();

// ======================
// Environment Validation
// ======================
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];
requiredEnvVars.forEach(env => {
  if (!process.env[env]) {
    console.error(`Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

// ======================
// Enhanced Security
// ======================
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Trust Render's proxy
app.set('trust proxy', 1);

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later'
});

// ======================
// CORS Configuration
// ======================
const allowedOrigins = [
  'https://taxera.onrender.com',
  'http://localhost:5173'
];

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

// ======================
// Database Connection
// ======================
const DB = process.env.MONGODB_URI.replace(
  '<PASSWORD>',
  encodeURIComponent(process.env.MONGODB_PASSWORD)
);

let retries = 0;
const MAX_RETRIES = 3;

const connectWithRetry = () => {
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 30000,
    maxPoolSize: 50,
    retryWrites: true,
    w: 'majority'
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error(`MongoDB connection error (attempt ${retries + 1}/${MAX_RETRIES}):`, err.message);
    if (retries < MAX_RETRIES) {
      retries++;
      setTimeout(connectWithRetry, 5000);
    } else {
      console.error('Max retries reached. Exiting...');
      process.exit(1);
    }
  });
};

connectWithRetry();

// ======================
// User Model
// ======================
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Invalid email format'
    }
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

UserSchema.index({ email: 1 });

const User = mongoose.model('User', UserSchema);

// ======================
// Middleware
// ======================
const protect = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) throw new Error('Not authorized');

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) throw new Error('User not found');
      if (roles.length && !roles.includes(user.role)) {
        throw new Error('Insufficient permissions');
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };
};

// ======================
// Production Setup
// ======================
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    const status = {
      status: 'UP',
      timestamp: new Date(),
      dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      memoryUsage: process.memoryUsage()
    };
    res.status(200).json(status);
  });
}

// ======================
// API Routes
// ======================
app.use('/api/', apiLimiter);

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const usersCount = await User.countDocuments();
    const role = usersCount === 0 ? 'admin' : 'user';
    
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    });
    
    res.status(201).json({ 
      user: { 
        id: user._id, 
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

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    });
    
    res.json({ 
      user: { 
        id: user._id, 
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

app.get('/api/user', protect(), async (req, res) => {
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
// Client Routing
// ======================
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  } else {
    res.status(404).json({ message: 'Route not found' });
  }
});

// ======================
// Error Handling
// ======================
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
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});