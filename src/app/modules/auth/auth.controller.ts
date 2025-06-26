import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { AuthService } from "./auth.service";
import { ILoginUser } from "./auth.interface";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data: ILoginUser = req.body;

    const result = await AuthService.loginUser(data);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Login successful",
      data: result,
    });
  }
);

export const AuthController = {
  login,
};
