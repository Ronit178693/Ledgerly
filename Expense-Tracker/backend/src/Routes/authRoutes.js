import express from 'express';
const router = express.Router();
import {Signup, Login, Logout} from "../Controllers/authController.js"

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

export default router;