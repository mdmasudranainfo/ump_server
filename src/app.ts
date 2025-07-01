import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app: Application = express();

import globalErrorHandler from "./app/modules/middleware/globalErrorHandler";
import { userRouter } from "./app/modules/user/user.route";

import ValidationRequest from "./app/modules/middleware/validateRequest";
import { UserValidation } from "./app/modules/user/user.validation";
import { academicSemesterRoute } from "./app/modules/AcademicSemester/AcademicSemester.route";
import router from "./app/routes";
import status from "http-status";

// cors
app.use(cors());
// parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// application

app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  next();
});

// Global error handler
app.use(globalErrorHandler);

// not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
  next();
});

export default app;
