
import { Router } from 'express';
import { getBoardsController } from '../controllers/board.controller.js';

const router = Router();

router.route('/get-boards').get(getBoardsController);


export default router;