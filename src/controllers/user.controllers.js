import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const loginUserController = asyncHandler(async (req, res) => {
  const { password, userName } = req.body;

  try {
    const user = await UserModel.findOne({
      user_name: userName,
      password: password,
    });

    if (user) {
      return res.status(200).json(
        new ApiResponse(200, {
          userid: user._id,
          username: user.user_name,
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
    const results = await UserModel.find({ user_name: userName });
    if (results.length == 0) {
      await UserModel.create({ user_name: userName, password: password });
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

export { loginUserController, signupUserController };
