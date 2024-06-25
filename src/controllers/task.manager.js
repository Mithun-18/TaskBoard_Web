import { BoardModel } from "../models/board.model.js";
import { TaskModel } from "../models/task.model.js";
import { TaskStatusModel } from "../models/taskStatus.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBoardController = asyncHandler(async (req, res) => {
  const userId = req.headers.userid;
  const { boardName } = req.body;
  try {
    const result = await BoardModel.create({
      name: boardName,
      user_id: userId,
    });
    if (result) {
      const { _id } = await BoardModel.findOne(
        {
          name: boardName,
          user_id: userId,
        },
        { _id: 1 }
      );
      res
        .status(200)
        .json(new ApiResponse(200, { boardId: _id }, "inserted successfully"));
    } else {
      res.status(500).json(new ApiResponse(500, "cannot insert"));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.responce));
  }
});

const getBoardsController = asyncHandler(async (req, res) => {
  const userId = req.headers.userid;
  let boardData = [];
  try {
    const results = await BoardModel.find({ user_id: userId }).lean();
    results.map((result) => {
      boardData.push({
        table_id: result._id,
        name: result.name,
        user_id: result.user_id,
      });
    });
    return res.status(200).json(new ApiResponse(200, boardData));
  } catch (error) {
    res.status(500).json(new ApiError(500, error.responce));
  }
});

const taskController = asyncHandler(async (req, res) => {
  const { boardId } = req.body;
  const userId = req.headers.userid;
  let arr = [];

  try {
    if (boardId) {
      let boardInfo = await TaskModel.find(
        { board_id: boardId },
        { _id: 1, board_id: 1, title: 1, desc_task: 1 }
      ).lean();

      // await boardInfo.forEach(async (curTask) => {
      //   let taskStatus = await TaskStatusModel.findOne(
      //     { task_id: curTask._id, is_deleted: 0 },
      //     { _id: 0, status: 1 }
      //   ).lean();
      //   if (taskStatus?.status) {
      //     arr.push({
      //       ...curTask,
      //       status: taskStatus?.status,
      //     });
      //     console.log(arr,"arr")
      //   }
      // });
      // console.log(arr);

      boardInfo = await boardInfo.reduce(async (acc, curTask) => {
        acc = await acc;
        let taskStatus = await TaskStatusModel.findOne(
          { task_id: curTask._id, is_deleted: 0 },
          { _id: 0, status: 1 }
        );
        if (taskStatus?.status) {
          acc.push({
            task_id: curTask._id,
            board_id: curTask.board_id,
            title: curTask.title,
            desc_task: curTask.desc_task,
            status: taskStatus?.status,
          });
        }
        return acc;
      }, Promise.resolve([]));

      // console.log("boardInfo", boardInfo);
      return res.status(200).json(new ApiResponse(200, boardInfo));
    } else {
      return res.status(500).json(new ApiError(500, "Board id is required"));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, error.sqlMessage || error.responce));
  }
});

const addTaskController = asyncHandler(async (req, res) => {
  const { boardId, taskName, decription, taskStatus } = req.body;
  let errorData = [];
  if (!boardId) {
    errorData.push("boardId required");
  }
  if (!taskName) {
    errorData.push("taskName required");
  }
  if (!decription) {
    errorData.push("decription required");
  }
  if (!taskStatus) {
    errorData.push("taskStatus required");
  }

  try {
    if (errorData.length == 0) {
      const queryResult = await TaskModel.create({
        board_id: boardId,
        title: taskName,
        desc_task: decription,
      });
      const { _id } = queryResult;
      await TaskStatusModel.create({
        task_id: _id,
        status: taskStatus,
        is_deleted: 0,
      });
      return res.status(200).json(
        new ApiResponse(200, {
          board_id: boardId,
          title: taskName,
          task_id: _id,
          desc_task: decription,
          status: taskStatus,
        })
      );
    } else {
      return res.status(500).json(new ApiError(500, errorData));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.responce));
  }
});

const editTaskController = asyncHandler(async (req, res) => {
  const { boardId, taskName, decription, taskStatus, taskId } = req.body;
  let errorData = [];
  if (!boardId) {
    errorData.push("boardId required");
  }
  if (!taskName) {
    errorData.push("taskName required");
  }
  if (!decription) {
    errorData.push("decription required");
  }
  if (!taskStatus) {
    errorData.push("taskStatus required");
  }
  if (!taskId) {
    errorData.push("taskId required");
  }

  try {
    if (errorData.length == 0) {
      const queryResults = await TaskModel.findByIdAndUpdate(taskId, {
        title: taskName,
        desc_task: decription,
      });

      await TaskStatusModel.findOneAndUpdate(
        { task_id: taskId },
        { status: taskStatus }
      );
      return res.status(200).json(
        new ApiResponse(200, {
          board_id: boardId,
          title: taskName,
          task_id: taskId,
          desc_task: decription,
          status: taskStatus,
        })
      );
    } else {
      return res.status(500).json(new ApiError(500, errorData));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.responce));
  }
});

const deleteTaskController = asyncHandler(async (req, res) => {
  try {
    const { taskId } = req.body;

    if (taskId) {
      await TaskStatusModel.findOneAndUpdate(
        { task_id: taskId },
        { is_deleted: 1 }
      );
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            deleted_task_id: taskId,
          },
          "deleted succesfully"
        )
      );
    } else {
      return res.status(500).json(new ApiError(500, "taskId is required"));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.responce));
  }
});

const deleteBoardController = asyncHandler(async (req, res) => {
  try {
    const { boardId } = req.body;
    if (boardId) {
      await BoardModel.deleteOne({ _id: boardId });
      const results = await TaskModel.find({ board_id: boardId });
      const taskIds = results.map((obj) => obj._id);
      await TaskModel.deleteMany({ board_id: boardId });
      taskIds.map(
        async (taskId) => await TaskStatusModel.deleteOne({ task_id: taskId })
      );
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { deleted_board_id: boardId },
            "deleted succesfully"
          )
        );
    } else {
      return res.status(500).json(new ApiError(500, "boardId is required"));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.responce));
  }
});

export {
  addTaskController,
  createBoardController,
  deleteBoardController,
  deleteTaskController,
  editTaskController,
  getBoardsController,
  taskController,
};
