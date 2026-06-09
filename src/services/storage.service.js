import { supabase } from '../config/supabase.js';

const BUCKET = process.env.SUPABASE_BUCKET || 'review-images';

export const StorageService = {
  async uploadImage(path, file) {
    if (!file || !file.buffer) throw new Error('No file buffer provided');
    const { data, error } = await supabase.storage.from(BUCKET).upload(path, file.buffer, { contentType: file.mimetype });
    if (error) throw error;
    const { data: urlData } = await supabase.storage.from(BUCKET).getPublicUrl(path);
    return urlData.publicUrl;
  }
};
