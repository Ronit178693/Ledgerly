import express from 'express';
import multer from 'multer';
const router = express.Router()
import { addExpense, getExpense, deleteExpense } from "../Controllers/expenseController.js";
import { checker } from '../Middlewares/authMiddleware.js';


const upload = multer({ dest: "../../expenseUploads/" }); // files go to uploads folder

router.post('/addexpense', checker, upload.single("attachment"), addExpense);
router.get('/getexpense', checker, getExpense);
router.delete('/:id', checker, deleteExpense);

export default router;
