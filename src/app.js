import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import publicRoutes from './routes/public.routes.js';
import adminRoutes from './routes/admin.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

// Security headers
app.use(helmet());

// CORS - restrict by env ALLOWED_ORIGINS (comma-separated)
const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const corsOptions = allowed.length ? { origin: (origin, cb) => {
  if (!origin) return cb(null, true); // allow non-browser clients like curl
  if (allowed.includes(origin)) return cb(null, true);
  return cb(new Error('Not allowed by CORS'));
}} : {};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Global rate limiter
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Admin-specific stricter limit
const adminLimiter = rateLimit({ windowMs: 60_000, max: 30, standardHeaders: true, legacyHeaders: false });
app.use('/api/admin', adminLimiter);

app.use(publicRoutes);
app.use(adminRoutes);
app.use(uploadRoutes);

// Error handler (hides stack in production)
app.use((err, req, res, next) => {
  if (!err) return next();
  // Delegate to centralized error handler but avoid leaking details
  if (process.env.NODE_ENV === 'production') {
    console.error(err.message);
    return res.status(err.status || 500).json({ success: false, message: 'Internal Server Error' });
  }
  return errorHandler(err, req, res, next);
});

export default app;
