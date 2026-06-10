import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

export async function requireAdmin(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Missing Authorization header' });

    const token = auth.split(' ')[1];
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (!secret) return res.status(500).json({ success: false, message: 'JWT secret not configured' });

    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: decoded.sub },
      select: { id: true, full_name: true, role: true }
    });

    if (!profile) return res.status(403).json({ success: false, message: 'Profile not found' });
    if (profile.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin role required' });

    req.user = { id: decoded.sub, email: decoded.email, profile };
    return next();
  } catch (err) {
    logger.error({ err }, 'Auth middleware error');
    return res.status(500).json({ success: false, message: 'Authentication failed' });
  }
}
