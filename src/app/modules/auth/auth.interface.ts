export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken: string;
  needPasswordChange: boolean;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
