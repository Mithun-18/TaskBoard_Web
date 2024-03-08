import { connectionPool } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
                  select tb.user_id,tt.board_id
                  from tbl_boards tb join tbl_tasks tt on tb.table_id=tt.board_id 
                  WHERE tb.table_id=? and tb.user_id=?;
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

export { getBoardsController, taskController };
