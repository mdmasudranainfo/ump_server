import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<any> => {
  return payload;
  //
};

export const AuthService = {
  loginUser,
};
