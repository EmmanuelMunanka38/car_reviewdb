import { StorageService } from '../services/storage.service.js';
import { success } from '../utils/apiResponse.js';

export const UploadController = {
  async uploadImage(req, res, next) {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ success: false, message: 'No file uploaded' });

      const { manufacturer = 'unknown', model = 'unknown' } = req.body;
      const filename = `${Date.now()}-${file.originalname}`;
      const path = `${manufacturer}/${model}/${filename}`;
      const publicUrl = await StorageService.uploadImage(path, file);
      return success(res, { url: publicUrl }, 201);
    } catch (err) {
      next(err);
    }
  }
};
