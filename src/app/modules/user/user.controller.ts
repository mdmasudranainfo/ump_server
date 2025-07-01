import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { z } from "zod";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Create a new user with the received data
    const user = req.body;
    const newUser = await userService.createUser(user);

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "User created successfully",
      data: newUser,
    });

    res.status(201).json({ success: true, data: newUser });
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await userService.deleteUser(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "User deleted successfully",
    });
  }
);

export const userController = {
  createUser,
  deleteUser,
};
