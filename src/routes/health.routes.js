import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

/**
 * @openapi
 * /api/health:
 *   get:
 *     tags: [System]
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Server is healthy
 *       503:
 *         description: Database is unreachable
 */
router.get('/api/health', async (req, res) => {
  const health = { status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() };
  try {
    const { error } = await supabase.from('reviews').select('id').limit(1);
    health.database = error ? 'error' : 'connected';
  } catch {
    health.database = 'error';
  }
  const statusCode = health.database === 'connected' ? 200 : 503;
  return res.status(statusCode).json({ success: true, data: health });
});

export default router;
