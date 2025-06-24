import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { AcademicFacultyService } from "./AcademicFaculty.service";
import pick from "../../../shared/pick";
import { paginationFills } from "../../../constants/pagination";

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const result = await AcademicFacultyService.createAcademicFaculty(data);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Academic semester Created successfully",
      data: result,
    });
  }
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFills);
    const result = await AcademicFacultyService.getAllAcademicFaculty(
      paginationOptions
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Academic semester Created successfully",
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
};
