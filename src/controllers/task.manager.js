import { connectionPool } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBoardController = asyncHandler(async (req, res) => {
  const userId = req.headers.userid;
  const { boardName } = req.body;
  try {
    const connection = await connectionPool.getConnection();
    let sql = `INSERT INTO tbl_boards(name,user_id) VALUES (?,?)`;
    const values = [boardName, userId];
    const queryResult = await connection.query(sql, values);
    connection.release();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { boardId: queryResult[0].insertId },
          "inserted successfully"
        )
      );
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.responce));
  }
});

const getBoardsController = asyncHandler(async (req, res) => {
  const userId = req.headers.userid;
  try {
    const connection = await connectionPool.getConnection();
    let sql = `select * from tbl_boards where user_id=?`;
    const [results] = await connection.query(sql, [userId]);
    connection.release();
    res.status(200).json(new ApiResponse(200, results));
  } catch (error) {
    res.status(500).json(new ApiError(500, error.responce));
  }
});

const taskController = asyncHandler(async (req, res) => {
  const { boardId } = req.body;
  const userId = req.headers.userid;

  try {
    if (boardId) {
      const connection = await connectionPool.getConnection();
      const sql = `
      select tt.board_id,tt.title,tt.desc_task,tts.status
      from tbl_boards tb join tbl_tasks tt on tb.table_id=tt.board_id join tbl_task_status tts on tt.table_id=tts.task_id
      WHERE tb.table_id=? and tb.user_id=? and tts.is_deleted=0;
                `;
      const values = [boardId, userId];
      const [results] = await connection.query(sql, values);
      connection.release();
      return res.status(200).json(new ApiResponse(200, results));
    } else {
      return res.status(500).json(new ApiError(500, "Board id is required"));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.responce));
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
      const connection = await connectionPool.getConnection();
      const insertForTasksql = `INSERT INTO tbl_tasks (board_id, title, desc_task) VALUES (?,?,?)`;
      const valuesForTask = [boardId, taskName, decription];
      const queryResult = await connection.query(
        insertForTasksql,
        valuesForTask
      );
      const taskId = queryResult[0].insertId;
      const insertForStatussql = `INSERT INTO tbl_task_status(task_id,status,is_deleted) VALUES (?,?,?);`;
      const valueForStatus = [taskId, taskStatus, 0];
      await connection.query(insertForStatussql, valueForStatus);
      connection.release();
      return res.status(200).json(
        new ApiResponse(200, {
          board_id: boardId,
          title: taskName,
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

export {
  addTaskController,
  createBoardController,
  getBoardsController,
  taskController,
};
