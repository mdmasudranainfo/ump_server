import { Secret } from "jsonwebtoken";
import Jwt from "jsonwebtoken";
import ApiError from "../error/ApiError";
import status from "http-status";

const verifyToken = (
  token: string,
  secret: Secret
): { id: string; role: string } => {
  try {
    const decoded = Jwt.verify(token, secret as Secret);
    if (typeof decoded === "string" || !decoded) {
      throw new ApiError(status.FORBIDDEN, "Invalid refresh token");
    }
    return { id: decoded.id as string, role: decoded.role as string };
  } catch (error) {
    throw new ApiError(status.FORBIDDEN, "Invalid refresh token");
  }
};

export const jwtHelper = {
  verifyToken,
};
