import { ReviewService } from '../services/review.service.js';
import { success, error as apiError } from '../utils/apiResponse.js';

export const ReviewController = {
  async listPublic(req, res, next) {
    try {
      const { page, limit, search, manufacturer, minYear, maxYear, minRating, featured } = req.query;
      const result = await ReviewService.getPublishedReviews({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        search,
        manufacturer,
        minYear,
        maxYear,
        minRating,
        featured
      });
      return success(res, result.data, 200, { page: result.page, limit: result.limit, total: result.total });
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

  async listFeatured(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await ReviewService.getFeaturedReviews({ page, limit });
      return success(res, result.data, 200, { page: result.page, limit: result.limit, total: result.total });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const payload = { ...req.body, created_by: req.user.id };
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
      const data = await ReviewService.softDeleteReview(id);
      return success(res, data);
    } catch (err) {
      next(err);
    }
  },

  async restore(req, res, next) {
    try {
      const { id } = req.params;
      const data = await ReviewService.restoreReview(id);
      return success(res, data);
    } catch (err) {
      next(err);
    }
  },

  async adminList(req, res, next) {
    try {
      const { page, limit, status, search, includeDeleted } = req.query;
      const result = await ReviewService.adminGetAll({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
        search,
        includeDeleted: includeDeleted === 'true'
      });
      return success(res, result.data, 200, { page: result.page, limit: result.limit, total: result.total });
    } catch (err) {
      next(err);
    }
  }
};
