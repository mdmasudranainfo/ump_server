import { Response } from "express";

interface IResponse {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: any;
}

const sendResponse = (res: Response, data: IResponse) => {
  const resData: IResponse = {
    statusCode: data.statusCode,
    success: data.success,
    message: data?.message,
    data: data.data ? data.data : null,
  };

  res.status(data.statusCode).json(resData);
};

export default sendResponse;
