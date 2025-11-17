import express from 'express';
import multer from 'multer';
const router = express.Router()
import { addIncome, getIncome, deleteIncome } from "../Controllers/incomeController.js";
import { checker } from '../Middlewares/authMiddleware.js';


const upload = multer({ dest: "../../incomeUploads/" }); // files go to uploads folder

router.post('/addincome', checker, upload.single("attachment"), addIncome);
router.get('/getincome', checker, getIncome);
router.delete('/:id', checker, deleteIncome);

export default router;