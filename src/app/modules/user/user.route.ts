// this is user route file
import express, { Request, Response } from "express";
import { userController } from "./user.controller";
import ValidationRequest from "../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../middleware/auth";
import { USER_ROLE } from "../../../enums/user_enums";

const router = express.Router();

router.post(
  "/create",
  ValidationRequest(UserValidation.createUserValidatorZodSchema),
  auth(USER_ROLE.ADMIN),
  userController.createUser
);
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
