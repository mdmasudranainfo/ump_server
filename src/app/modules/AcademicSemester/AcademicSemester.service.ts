import status from "http-status";
import ApiError from "../../../error/ApiError";
import {
  academicSemesterTitleCodeMapper,
  IFilters,
} from "./AcademicSemester.constant";
import IAcademicSemester from "./AcademicSemester.interface";
import AcademicSemester from "./AcademicSemester.model";
import { IPaginationOptions } from "../../../interfaces/IPaginationOptions";
import { IGenericResponse } from "../../../interfaces/common";
import calculatePagination from "../../../helpers/paginationHalper";
import { SortOrder } from "mongoose";

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, "Invalid semester code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesters = async (
  filters: IFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  // const { page = 1, limit = 10 } = paginationOptions;
  // const skip = (page - 1) * limit;

  let sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // search
  const { searchTerm, ...filtersData } = filters;

  const academicSemesterSearchableFields = ["title", "code", "year"];

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i", // case-insensitive search
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i", // case-insensitive search
        },
      })),
    });
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: "i",
  //         },
  //       },
  //     ],
  //   },
  // ];

  // query

  //

  //
  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAcademicSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);

  return result;
};

const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(status.BAD_REQUEST, "Invalid semester code");
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteAcademicSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);

  return result;
};

//
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
