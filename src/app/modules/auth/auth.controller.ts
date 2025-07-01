import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { AuthService } from "./auth.service";
import { ILoginUser } from "./auth.interface";
import config from "../../../config";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data: ILoginUser = req.body;

    const result = await AuthService.loginUser(data);
    const { refreshToken, ...Others } = result;

    const CookieOPtions = {
      secure: config.env === "production",
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, CookieOPtions);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Login successful",
      data: Others,
    });
  }
);

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { refreshToken } = req.cookies;

    const result = await AuthService.refreshToken(refreshToken);

    const CookieOPtions = {
      secure: config.env === "production",
      httpOnly: true,
    };

    res.cookie("accessToken", result.accessToken, CookieOPtions);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Refresh token successful",
      data: result,
    });
  }
);

export const AuthController = {
  login,
  refreshToken,
};
