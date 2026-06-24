import { Router } from 'express';
import { getOverview } from '../controllers/dashboard.controller.js';

const router = Router();

/**
 * GET /api/dashboard/overview
 * Retorna as métricas do overview
 */
router.get('/overview', getOverview);

export default router;
