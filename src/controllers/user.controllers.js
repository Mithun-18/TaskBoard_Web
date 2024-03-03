import { asyncHandler } from "../utils/asyncHandler.js";

const loginUserController = asyncHandler(async (req, res) => {
  return res.status(200).json({ message: "ok" });
});

export { loginUserController };
