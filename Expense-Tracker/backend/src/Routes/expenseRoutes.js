import express from 'express';
import multer from 'multer';
const router = express.Router()
import { addExpense, getExpense, deleteExpense } from "../Controllers/expenseController.js";
import {authMiddleware} from '../Middlewares/authMiddleware.js';




router.post('/addexpense', authMiddleware, addExpense);
router.get('/getexpense', authMiddleware, getExpense);
router.delete('/:id', authMiddleware, deleteExpense);

export default router;
