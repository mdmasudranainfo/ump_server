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
      // check if user exit

      // get token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(status.UNAUTHORIZED, "You are not authorized");
      }

      const verifyToken = jwtHelper.verifyToken(
        token,
        config.jwt.secret as Secret
      );

      // check if user role is allowed
      if (RequiredRole.length && !RequiredRole.includes(verifyToken.role)) {
        throw new ApiError(
          status.FORBIDDEN,
          "You are not allowed to access this resource"
        );
      }
      req.user = verifyToken;
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
