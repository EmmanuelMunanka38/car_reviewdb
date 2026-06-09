import express from 'express';
import multer from 'multer';
import { requireAdmin } from '../middlewares/auth.middleware.js';
import { UploadController } from '../controllers/upload.controller.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/api/upload/image', requireAdmin, upload.single('image'), UploadController.uploadImage);

export default router;
