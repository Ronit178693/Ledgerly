import express from 'express';
import { authMiddleware } from '../Middlewares/authMiddleware.js';
import dashboardController from '../Controllers/dashboardController.js';
const router = express.Router();


router.get('/dashboard-data', authMiddleware, dashboardController);

export default router;
