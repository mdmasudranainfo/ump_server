// this is user route file
import express, { Request, Response } from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/create", userController.createUser);
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
