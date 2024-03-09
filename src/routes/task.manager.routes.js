import { Router } from "express";
import { createBoardController, getBoardsController, taskController } from "../controllers/task.manager.js";


const router = Router();

router.route("/boards").get(getBoardsController);
router.route("/tasks-by-boardid").post(taskController);
router.route('/create-board').post(createBoardController);

export default router;
