import { Router } from "express";
import { addTaskController, createBoardController, getBoardsController, taskController } from "../controllers/task.manager.js";


const router = Router();

router.route("/boards").get(getBoardsController);
router.route("/tasks-by-boardid").post(taskController);
router.route('/create-board').post(createBoardController);
router.route('/add-task').post(addTaskController);

export default router;
