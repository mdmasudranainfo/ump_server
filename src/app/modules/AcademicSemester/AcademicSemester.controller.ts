import { NextFunction, Request, Response } from "express";
import { AcademicSemesterService } from "./AcademicSemester.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { IPaginationOptions } from "../../../interfaces/IPaginationOptions";
import pick from "../../../shared/pick";
import { paginationFills } from "../../../constants/pagination";

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(data);

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Academic semester created successfully",
      data: result,
    });
  }
);

const getAllAcademicSemesters = catchAsync(async (req, res, next) => {
  // pagination start
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy as string,
  //   sortOrder: req.query.sortOrder,
  // };

  const paginationOptions = pick(req.query, paginationFills);
  const filters = pick(req.query, ["searchTerm", "title", "code", "year"]);

  // pagination start end
  const result = await AcademicSemesterService.getAllAcademicSemesters(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.getSingleAcademicSemester(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Academic semester retrieved successfully",
      data: result,
    });
  }
);

const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = req.body;

    const result = await AcademicSemesterService.updateAcademicSemester(
      id,
      data
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Academic semester updated successfully",
      data: result,
    });
  }
);

const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.deleteAcademicSemester(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Academic semester deleted successfully",
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
