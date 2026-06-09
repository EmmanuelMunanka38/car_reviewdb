import { ReviewService } from '../services/review.service.js';
import { success, error as apiError } from '../utils/apiResponse.js';

export const ReviewController = {
  async listPublic(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const data = await ReviewService.getPublishedReviews({ page, limit });
      return success(res, data);
    } catch (err) {
      next(err);
    }
  },

  async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const data = await ReviewService.getReviewBySlug(slug);
      return success(res, data);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const payload = { ...req.body, created_by: req.user.id, created_at: new Date().toISOString() };
      const data = await ReviewService.createReview(payload);
      return success(res, data, 201);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const payload = req.body;
      const data = await ReviewService.updateReview(id, payload);
      return success(res, data);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const data = await ReviewService.deleteReview(id);
      return success(res, data, 200);
    } catch (err) {
      next(err);
    }
  },

  async adminList(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const data = await ReviewService.adminGetAll({ page, limit });
      return success(res, data);
    } catch (err) {
      next(err);
    }
  }
};
