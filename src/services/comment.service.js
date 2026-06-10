import { supabase } from '../config/supabase.js';

export const CommentService = {
  async getCommentsByReview(reviewId, { page = 1, limit = 20 } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('comments')
      .select('*', { count: 'exact' })
      .eq('review_id', reviewId)
      .eq('status', 'approved')
      .order('created_at', { ascending: true })
      .range(from, to);

    if (error) throw error;
    return { data, total: count, page, limit };
  },

  async createComment(reviewId, payload) {
    const { data: review } = await supabase
      .from('reviews')
      .select('id')
      .eq('id', reviewId)
      .is('deleted_at', null)
      .single();

    if (!review) throw Object.assign(new Error('Review not found'), { status: 404 });

    const { data, error } = await supabase
      .from('comments')
      .insert([{ ...payload, review_id: reviewId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async adminGetAll({ page = 1, limit = 20, status } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from('comments').select('*, reviews!inner(title, slug)', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query.order('created_at', { ascending: false }).range(from, to);
    if (error) throw error;
    return { data, total: count, page, limit };
  },

  async moderateComment(id, status) {
    const { data, error } = await supabase
      .from('comments')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteComment(id) {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) throw error;
    return { id };
  }
};
