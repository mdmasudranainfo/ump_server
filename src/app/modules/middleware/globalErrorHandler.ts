import { ErrorRequestHandler } from "express";

import config from "../../../config";
import handleValidationError from "../../../error/handleValidationError";

import { IGenericErrorMessage } from "../../../interfaces/error";
import ApiError from "../../../error/ApiError";

import { ZodError } from "zod";
import handleZodError from "../../../error/handleZodError";
import handleCastError from "../../../error/handleCastError";
import { errorlogger } from "../../../shared/logger";

const globalErrorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
  config.env === "development"
    ? console.log("globalErrorHandler", err)
    : errorlogger.error("globalErrorHandler", err);

  let statusCode = 500;
  let message = "internal server error";
  let errorMessage: IGenericErrorMessage[] = [];

  //
  if (err.name === "ValidationError") {
    const simplifyError = handleValidationError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessage = simplifyError.errorMessages;
  } else if (err instanceof ZodError) {
    //
    const simplifyError = handleZodError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessage = simplifyError.errorMessages;

    //
  } else if (err?.name === "CastError") {
    const simplifyError = handleCastError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessage = simplifyError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
