
import { Router } from 'express';
import { loginUserController, signupUserController, testController } from '../controllers/user.controllers.js';

const router = Router();

router.route('/login').post(loginUserController);

router.route('/login').get(testController);

router.route('/signup').post(signupUserController);

export default router;