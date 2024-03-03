
import { Router } from 'express';
import { loginUserController } from '../controllers/user.controllers.js';

const router = Router();

router.route('/login').get(loginUserController);

export default router;