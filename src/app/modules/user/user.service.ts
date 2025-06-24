import config from "../../../config";
import ApiError from "../../../error/ApiError";
import IUser from "./user.interface";
import User from "./user.model";
import { generateUserId } from "./user.utils";
import bcrypt from "bcrypt";

const createUser = async (data: IUser): Promise<IUser | null> => {
  // auto genarated incremental id in 6 degit
  const id = await generateUserId();
  data.id = id;

  //default password

  if (!data.password) {
    data.password = config.default_student_pass as string;
  }

  // hash password
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bcrypt_salt_rounds)
  );

  // Create a new user
  const user = await User.create(data);
  if (!user) {
    throw new ApiError(400, "User not created");
  }
  return user;
};

export const userService = {
  createUser,
};
