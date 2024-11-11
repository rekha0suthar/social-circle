import { Router } from 'express';
import { login, signup } from '../controllers/userController.js';
const router = Router();

// @desc --- POST /api/user/signup
router.post('/signup', signup);

// @desc  --- POST /api/user/login
router.post('/login', login);

export default router;
