import { promises } from "winston-daily-rotate-file";
import IAcademicFaculty from "./AcademicFaculty.interface";
import AcademicFaculty from "./AcademicFaculty.model";
import { IPaginationOptions } from "../../../interfaces/IPaginationOptions";
import calculatePagination from "../../../helpers/paginationHalper";
import { SortOrder } from "mongoose";

const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFaculty = async (
  paginationOptions: IPaginationOptions
): Promise<IAcademicFaculty[]> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  //
  let sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  //
  const result = await AcademicFaculty.find();
  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculty,
};
