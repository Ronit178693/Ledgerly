import express from 'express';
import { getUserData } from "../Controllers/userController.js";
const router = express.Router();

router.get('/data', getUserData);

export default router;