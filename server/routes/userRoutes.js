import express from 'express';
import { getUsers, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;
