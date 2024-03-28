import { connectionPool } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const loginUserController = asyncHandler(async (req, res) => {
  const { password, userName } = req.body;

  try {
    const connection = await connectionPool.getConnection();
    const sql = "select * from tbl_users where user_name = ? AND password = ?";
    const values = [userName, password];

    const [results] = await connection.query(sql, values);
    connection.release();

    if (results.length > 0) {
      return res.status(200).json(
        new ApiResponse(200, {
          userid: results[0].table_id,
          username: results[0].user_name,
        })
      );
    } else {
      res.status(404).json(new ApiError(404, "User not found."));
    }
  } catch (error) {
    res.status(500).json(new ApiError(500, error.response));
  }
}, false);

const signupUserController = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  try {
    const connection = await connectionPool.getConnection();
    let sql = "select * from tbl_users where user_name = ?;";
    const [results] = await connection.query(sql, userName);
    connection.release();
    if (results.length == 0) {
      const connection = await connectionPool.getConnection();
      sql = "INSERT INTO tbl_users(user_name,password) VALUES (?,?);";
      const values = [userName, password];
      await connection.query(sql, values);
      connection.release();
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            username: userName,
          },
          "Signed up successfully!"
        )
      );
    } else {
      return res
        .status(404)
        .json(
          new ApiError(
            404,
            `"${userName}" already exists\n try different user name !`
          )
        );
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.response));
  }
}, false);

const testController = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "success",
  });
});

export { loginUserController, testController, signupUserController };
