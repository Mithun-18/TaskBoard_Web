import { Router } from "express";
import { getBoardsController, taskController } from "../controllers/task.manager.js";


const router = Router();

router.route("/boards").get(getBoardsController);
router.route("/tasks-by-boardid").post(taskController);

export default router;
