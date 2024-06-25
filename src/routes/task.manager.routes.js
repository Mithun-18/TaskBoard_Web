import { Router } from "express";
import {
  addTaskController,
  createBoardController,
  deleteBoardController,
  deleteTaskController,
  editTaskController,
  getBoardsController,
  taskController,
} from "../controllers/task.manager.js";

const router = Router();

router.route("/boards").get(getBoardsController);
router.route("/tasks-by-boardid").post(taskController);
router.route("/create-board").post(createBoardController);
router.route("/add-task").post(addTaskController);
router.route("/delete-task").post(deleteTaskController);
router.route("/edit-task").put(editTaskController);
router.route("/delete-board").post(deleteBoardController);

export default router;
