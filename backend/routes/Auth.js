import express from 'express';
import { CurrentUser, getAllUsers, LoginUser, RegisterUser } from '../controllers/UserController.js';
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.get('/me', AuthMiddleware, CurrentUser);

export default router;
