import { supabase } from '../config/supabase.js';

export async function requireAdmin(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Missing token' });

    const token = auth.split(' ')[1];

    const { data: { user }, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !user) return res.status(401).json({ success: false, message: 'Invalid token' });

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id,full_name,role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) return res.status(403).json({ success: false, message: 'Profile not found' });
    if (profile.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin role required' });

    req.user = { id: user.id, profile };
    next();
  } catch (err) {
    next(err);
  }
}
