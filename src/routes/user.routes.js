
import { Router } from 'express';
import { loginUserController } from '../controllers/user.controllers.js';

const router = Router();

router.route('/login').post(loginUserController);

export default router;