import { supabase } from '../config/supabase.js';
import { slugify } from '../utils/slugify.js';

export const ReviewService = {
  async createReview(payload) {
    const slugBase = payload.slug || slugify(payload.title || `${payload.manufacturer}-${payload.model}`);
    const slug = `${slugBase}-${Date.now().toString(36)}`;

    const { data, error } = await supabase.from('reviews').insert([{ ...payload, slug }]).select().single();
    if (error) throw error;
    return data;
  },

  async updateReview(id, payload) {
    const updates = { ...payload, updated_at: new Date().toISOString() };
    const { data, error } = await supabase.from('reviews').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async deleteReview(id) {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) throw error;
    return { id };
  },

  async getPublishedReviews({ page = 1, limit = 10 } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return data;
  },

  async getReviewBySlug(slug) {
    const { data, error } = await supabase.from('reviews').select('*').eq('slug', slug).eq('status', 'published').single();
    if (error) throw error;
    return data;
  },

  async adminGetAll({ page = 1, limit = 20 } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false }).range(from, to);
    if (error) throw error;
    return data;
  }
};
