import { CastError } from "mongoose";
import { IGenericErrorMessage } from "../interfaces/error";

const handleCastError = (err: CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err.path,
      message: `Invalid Object Id`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "validation error",
    errorMessages: errors,
  };
};

export default handleCastError;
