import status from "http-status";
import ApiError from "../../../error/ApiError";
import User from "../user/user.model";
import { ILoginResponse, ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import Jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const loginData = payload;

  // const isUserExit = await User.findOne(
  //   { id: loginData.id },
  //   { id: 1, password: 1 }
  // ).lean();

  const user = new User();
  const isUserExit = await user.isUserExist(loginData.id);

  if (!isUserExit) {
    throw new ApiError(status.NOT_FOUND, "User dose not exit");
  }

  const matchPassword = await bcrypt.compare(
    loginData.password,
    isUserExit?.password
  );

  // const isPasswordMatch = await user.isPasswordMatch(
  //   loginData.password,
  //   user.password
  // );

  if (!matchPassword) {
    throw new ApiError(status.UNAUTHORIZED, "Password is incorrect");
  }

  // crate access token
  const accessToken = Jwt.sign(
    {
      id: isUserExit.id,
      role: isUserExit.role,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: "7d",
    }
  );

  const refreshToken = Jwt.sign(
    {
      id: isUserExit.id,
      role: isUserExit.role,
    },
    config.jwt.refresh_secret as Secret,
    {
      expiresIn: "1d",
    }
  );

  // remove password from the response
  if (isUserExit && "password" in isUserExit) {
    delete (isUserExit as { password?: string }).password;
  }

  return {
    accessToken,
    refreshToken,
    needPasswordChange: isUserExit.needPasswordChange!,
  };
  //
};

const refreshToken = async (
  token: string
): Promise<{ accessToken: string }> => {
  let verifiedToken: Jwt.JwtPayload | null = null;

  try {
    const decoded = Jwt.verify(token, config.jwt.refresh_secret as Secret);
    if (typeof decoded === "string" || !decoded) {
      throw new ApiError(status.FORBIDDEN, "Invalid refresh token");
    }
    verifiedToken = decoded as Jwt.JwtPayload;
  } catch (error) {
    throw new ApiError(status.FORBIDDEN, "Invalid refresh token");
  }

  const { id, role } = verifiedToken;

  // check if user exists
  const user = new User();
  const isUserExit = await user.isUserExist(id);
  if (!isUserExit) {
    throw new ApiError(status.NOT_FOUND, "User does not exist");
  }

  // create new access token
  const newAccessToken = Jwt.sign({ id, role }, config.jwt.secret as Secret, {
    expiresIn: "1d",
  });

  return { accessToken: newAccessToken };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
