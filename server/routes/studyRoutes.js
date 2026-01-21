import express from 'express';
import { getStudies, createStudy, updateStudy, deleteStudy, getAllStudies, deleteStudyAdmin } from '../controllers/studyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getStudies).post(protect, createStudy);
router.route('/all').get(protect, admin, getAllStudies);
router.route('/:id').put(protect, updateStudy).delete(protect, deleteStudy);
router.route('/admin/:id').delete(protect, admin, deleteStudyAdmin);

export default router;
