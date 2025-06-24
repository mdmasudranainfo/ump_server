import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { AcademicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const result = await AcademicDepartmentService.createAcademicDepartment(
      data
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Academic semester Created successfully",
      data: result,
    });
  }
);
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicDepartmentService.getAllAcademicDepartment();

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Academic semester retrieved successfully",
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
};
