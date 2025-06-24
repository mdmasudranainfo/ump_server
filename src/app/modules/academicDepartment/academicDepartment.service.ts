import { IAcademicDepartment } from "./academicDepartment.intrface";
import AcademicDepartment from "./academicDepartment.model";

const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getAllAcademicDepartment = async (): Promise<IAcademicDepartment[]> => {
  const result = await AcademicDepartment.find({}).populate("academicFaculty");
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartment,
};
