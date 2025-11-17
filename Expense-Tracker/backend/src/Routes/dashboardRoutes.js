import express from 'express';
import { checker } from '../Middlewares/authMiddleware.js';
import dashboardController from '../Controllers/dashboardController.js';
const router = express.Router();


router.get('/', checker, getDashboard);

export default router;
