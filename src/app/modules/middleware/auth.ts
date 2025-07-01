import { NextFunction, Request, Response } from "express";
import ApiError from "../../../error/ApiError";
import status from "http-status";
import { jwtHelper } from "../../../helpers/jwtHelsper";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const auth =
  (...RequiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(status.UNAUTHORIZED, "You are not authorized");
      }

      const verifyToken = jwtHelper.verifyToken(
        token,
        config.jwt.secret as Secret
      );

      console.log("Token", token);

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
