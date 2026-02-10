import express from 'express';
import { createAssessment, getAssessmentById, updateAssessmentScores } from '../controllers/assessmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createAssessment);
router.route('/:id').get(protect, getAssessmentById);
router.route('/:id/scores').post(protect, updateAssessmentScores);

export default router;
