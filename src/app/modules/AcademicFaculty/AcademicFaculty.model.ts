import { model, Schema } from "mongoose";
import IAcademicFaculty from "./AcademicFaculty.interface";

const AcademicFacultySchema = new Schema<IAcademicFaculty>({
  title: { type: String, required: true },
});

const AcademicFaculty = model<IAcademicFaculty>(
  "AcademicFaculty",
  AcademicFacultySchema
);

export default AcademicFaculty;
