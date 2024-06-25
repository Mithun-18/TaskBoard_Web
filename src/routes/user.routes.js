import { Router } from "express";
import {
  loginUserController,
  signupUserController,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/login").post(loginUserController);
router.route("/signup").post(signupUserController);

export default router;
