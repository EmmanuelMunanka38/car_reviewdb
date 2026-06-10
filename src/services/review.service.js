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

  async softDeleteReview(id) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ deleted_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async restoreReview(id) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ deleted_at: null, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getPublishedReviews({ page = 1, limit = 10, search, manufacturer, minYear, maxYear, minRating, featured } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from('reviews').select('*', { count: 'exact' }).eq('status', 'published').is('deleted_at', null);

    if (search) {
      query = query.or(`title.ilike.%${search}%,manufacturer.ilike.%${search}%,model.ilike.%${search}%`);
    }
    if (manufacturer) {
      query = query.eq('manufacturer', manufacturer);
    }
    if (minYear) {
      query = query.gte('year', parseInt(minYear));
    }
    if (maxYear) {
      query = query.lte('year', parseInt(maxYear));
    }
    if (minRating) {
      query = query.gte('rating', parseFloat(minRating));
    }
    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    const { data, error, count } = await query.order('published_at', { ascending: false }).range(from, to);
    if (error) throw error;
    return { data, total: count, page, limit };
  },

  async getReviewBySlug(slug) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .is('deleted_at', null)
      .single();
    if (error) throw error;

    if (data) {
      await supabase.from('reviews').update({ views: (data.views || 0) + 1 }).eq('id', data.id);
    }

    return data;
  },

  async getFeaturedReviews({ page = 1, limit = 10 } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('reviews')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .eq('featured', true)
      .is('deleted_at', null)
      .order('published_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { data, total: count, page, limit };
  },

  async adminGetAll({ page = 1, limit = 20, status, search, includeDeleted } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from('reviews').select('*', { count: 'exact' });

    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,manufacturer.ilike.%${search}%,model.ilike.%${search}%`);
    }

    const { data, error, count } = await query.order('created_at', { ascending: false }).range(from, to);
    if (error) throw error;
    return { data, total: count, page, limit };
  },

  async getAllForSitemap() {
    const { data, error } = await supabase
      .from('reviews')
      .select('slug, updated_at')
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('published_at', { ascending: false });
    if (error) throw error;
    return data;
  }
};
