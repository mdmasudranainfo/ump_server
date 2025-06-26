import { Types } from "mongoose";
import IAcademicFaculty from "../AcademicFaculty/AcademicFaculty.interface";

export default interface IUser {
  id: string;
  role: string;
  password: string;
  needPasswordChange?: true | false;
  student?: Types.ObjectId;
  faculty?: Types.ObjectId | IAcademicFaculty;
  admin?: Types.ObjectId;
}
