// this is user route file
import express from "express";
import { AuthController } from "./auth.controller";
import { authValidation } from "./atuh.validation";
import ValidationRequest from "../middleware/validateRequest";
import auth from "../middleware/auth";
import { USER_ROLE } from "../../../enums/user_enums";

const router = express.Router();

router.post(
  "/login",
  ValidationRequest(authValidation.loginZodSchema),
  AuthController.login
);

router.post(
  "/refresh-token",
  ValidationRequest(authValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  "/change-password",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ValidationRequest(authValidation.changePasswordZodSchema),
  AuthController.changePassword
);

export const authRoute = router;
