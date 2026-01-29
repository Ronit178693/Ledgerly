import express from 'express';

const router = express.Router()
import { addIncome, getIncome, deleteIncome } from "../Controllers/incomeController.js";
import {authMiddleware} from '../Middlewares/authMiddleware.js';


router.post('/addincome', authMiddleware,  addIncome);
router.get('/getincome', authMiddleware, getIncome);
router.delete('/:id', authMiddleware, deleteIncome);

export default router;