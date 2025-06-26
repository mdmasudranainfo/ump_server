// this is user route file
import express from "express";
import { AuthController } from "./auth.controller";
import { authValidation } from "./atuh.validation";
import ValidationRequest from "../middleware/validateRequest";

const router = express.Router();

router.post(
  "/login",
  ValidationRequest(authValidation.loginZodSchema),
  AuthController.login
);

export const authRoute = router;
