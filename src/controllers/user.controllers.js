import { asyncHandler } from "../utils/asyncHandler.js";
import { connectionPool } from "../db/index.js";

const loginUserController = asyncHandler(async (req, res) => {
  const { password, userName } = req.body;
  try {
    const connection = await connectionPool.getConnection();
    const sql = "select * from tbl_users";
    const [results] = await connection.query(sql);
    console.log(results);
    connection.release();
  } catch (error) {
    console.log("test error", error);
  }

  return res.status(200).json({ message: "ok" });
});

export { loginUserController };
