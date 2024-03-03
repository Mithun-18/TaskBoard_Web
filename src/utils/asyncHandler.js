import { ApiError } from "./ApiError.js";

const asyncHandler = (requestHandler, authorize = true) => {
  return (req, res, next) => {
    if (authorize) {
      if (
        !(typeof req.headers.userid == "string" && req.headers.userid != "")
      ) {
        res.status(401).json(new ApiError(401, "Unauthorized"));
        return;
      }
    }
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

