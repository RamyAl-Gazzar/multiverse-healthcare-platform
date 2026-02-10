import express from 'express';
import { getDomains, createDomain, getStandardsByDomain, createStandard, createFacility } from '../controllers/gaharController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/domains').get(getDomains).post(protect, admin, createDomain);
router.route('/domains/:domainId/standards').get(getStandardsByDomain);
router.route('/standards').post(protect, admin, createStandard);
router.route('/facilities').post(protect, createFacility);

export default router;
