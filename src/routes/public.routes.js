import express from 'express';
import { ReviewController } from '../controllers/review.controller.js';
import { CommentController } from '../controllers/comment.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createCommentSchema } from '../validators/comment.validator.js';

const router = express.Router();

/**
 * @openapi
 * /api/reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: List published reviews
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: manufacturer
 *         schema: { type: string }
 *       - in: query
 *         name: minYear
 *         schema: { type: integer }
 *       - in: query
 *         name: maxYear
 *         schema: { type: integer }
 *       - in: query
 *         name: minRating
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/api/reviews', ReviewController.listPublic);

/**
 * @openapi
 * /api/reviews/featured:
 *   get:
 *     tags: [Reviews]
 *     summary: List featured reviews
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of featured reviews
 */
router.get('/api/reviews/featured', ReviewController.listFeatured);

/**
 * @openapi
 * /api/reviews/{slug}:
 *   get:
 *     tags: [Reviews]
 *     summary: Get a review by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Review data
 *       404:
 *         description: Review not found
 */
router.get('/api/reviews/:slug', ReviewController.getBySlug);

/**
 * @openapi
 * /api/reviews/{id}/comments:
 *   get:
 *     tags: [Comments]
 *     summary: List approved comments for a review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of comments
 *   post:
 *     tags: [Comments]
 *     summary: Create a comment on a review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author_name: { type: string }
 *               author_email: { type: string }
 *               body: { type: string }
 *             required: [author_name, body]
 *     responses:
 *       201:
 *         description: Created comment
 */
router.get('/api/reviews/:id/comments', CommentController.listByReview);
router.post('/api/reviews/:id/comments', validate(createCommentSchema), CommentController.create);

export default router;
