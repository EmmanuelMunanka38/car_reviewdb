import { supabase } from '../config/supabase.js';
import logger from '../utils/logger.js';

export async function requireAdmin(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Missing Authorization header' });

    const token = auth.split(' ')[1];

    const { data, error } = await supabase.auth.getUser(token);
    const user = data?.user;
    if (error || !user) return res.status(401).json({ success: false, message: 'Invalid or expired token' });

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id,full_name,role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) return res.status(403).json({ success: false, message: 'Profile not found' });
    if (profile.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin role required' });

    req.user = { id: user.id, email: user.email, profile };
    return next();
  } catch (err) {
    logger.error({ err }, 'Auth middleware error');
    return res.status(500).json({ success: false, message: 'Authentication failed' });
  }
}
