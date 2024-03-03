
import { Router } from 'express';
import { loginUserController, testController } from '../controllers/user.controllers.js';

const router = Router();

router.route('/login').post(loginUserController);

router.route('/login').get(testController);

export default router;