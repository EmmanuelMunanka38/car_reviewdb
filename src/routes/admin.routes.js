import express from 'express';
import { ReviewController } from '../controllers/review.controller.js';
import { CommentController } from '../controllers/comment.controller.js';
import { requireAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { validateUUID } from '../middlewares/validate-uuid.middleware.js';
import { createReviewSchema, updateReviewSchema } from '../validators/review.validator.js';
import { moderateCommentSchema } from '../validators/comment.validator.js';

const router = express.Router();

router.use('/api/admin', requireAdmin);

/**
 * @openapi
 * /api/admin/reviews:
 *   post:
 *     tags: [Admin - Reviews]
 *     summary: Create a review
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Created review
 *   get:
 *     tags: [Admin - Reviews]
 *     summary: List all reviews (including drafts)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [draft, published] }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: includeDeleted
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.post('/api/admin/reviews', validate(createReviewSchema), ReviewController.create);
router.get('/api/admin/reviews', ReviewController.adminList);

/**
 * @openapi
 * /api/admin/reviews/{id}:
 *   put:
 *     tags: [Admin - Reviews]
 *     summary: Update a review
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Updated review
 *   delete:
 *     tags: [Admin - Reviews]
 *     summary: Soft delete a review
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Review soft deleted
 */
router.put('/api/admin/reviews/:id', validateUUID(), validate(updateReviewSchema), ReviewController.update);
router.delete('/api/admin/reviews/:id', validateUUID(), ReviewController.remove);

/**
 * @openapi
 * /api/admin/reviews/{id}/restore:
 *   post:
 *     tags: [Admin - Reviews]
 *     summary: Restore a soft-deleted review
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Review restored
 */
router.post('/api/admin/reviews/:id/restore', validateUUID(), ReviewController.restore);

/**
 * @openapi
 * /api/admin/comments:
 *   get:
 *     tags: [Admin - Comments]
 *     summary: List all comments
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [approved, pending, spam] }
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get('/api/admin/comments', CommentController.adminList);

/**
 * @openapi
 * /api/admin/comments/{id}:
 *   put:
 *     tags: [Admin - Comments]
 *     summary: Moderate a comment (approve/reject/spam)
 *     security: [{ bearerAuth: [] }]
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
 *               status:
 *                 type: string
 *                 enum: [approved, pending, spam]
 *     responses:
 *       200:
 *         description: Comment moderated
 *   delete:
 *     tags: [Admin - Comments]
 *     summary: Delete a comment
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Comment deleted
 */
router.put('/api/admin/comments/:id', validateUUID(), validate(moderateCommentSchema), CommentController.moderate);
router.delete('/api/admin/comments/:id', validateUUID(), CommentController.remove);

export default router;
