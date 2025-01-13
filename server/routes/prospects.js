import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'public/images' });

import {
  getProspects,
  createProspect,
  updateProspect,
  updateProspectStatus,
  deleteProspect
} from '../controllers/prospectsController.js';

router.get('/', getProspects);
router.post('/', upload.single('img'), createProspect);
router.put('/:id/', updateProspect);
router.put('/:id/completed', updateProspectStatus);
router.delete('/:id/', deleteProspect);

export default router;