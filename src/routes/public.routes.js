import express from 'express';
import { ReviewController } from '../controllers/review.controller.js';

const router = express.Router();

router.get('/api/reviews', ReviewController.listPublic);
router.get('/api/reviews/:slug', ReviewController.getBySlug);

export default router;
