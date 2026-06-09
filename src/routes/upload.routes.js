import express from 'express';
import multer from 'multer';
import { requireAdmin } from '../middlewares/auth.middleware.js';
import { UploadController } from '../controllers/upload.controller.js';

const router = express.Router();

// Limit file size and types
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Only image uploads allowed'), false);
    return cb(null, true);
  }
});

router.post('/api/upload/image', requireAdmin, upload.single('image'), UploadController.uploadImage);

export default router;
