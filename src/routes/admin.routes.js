import express from 'express';
import { ReviewController } from '../controllers/review.controller.js';
import { requireAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createReviewSchema, updateReviewSchema } from '../validators/review.validator.js';

const router = express.Router();

router.use('/api/admin', requireAdmin);

router.post('/api/admin/reviews', validate(createReviewSchema), ReviewController.create);
router.put('/api/admin/reviews/:id', validate(updateReviewSchema), ReviewController.update);
router.delete('/api/admin/reviews/:id', ReviewController.remove);
router.get('/api/admin/reviews', ReviewController.adminList);

export default router;
