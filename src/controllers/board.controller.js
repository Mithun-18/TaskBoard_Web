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

export { getBoardsController };
