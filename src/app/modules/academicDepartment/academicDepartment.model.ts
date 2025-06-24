import { model, Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.intrface";

const AcademicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: { type: String, required: true },
    academicFaculty: {
      type: Schema.Types.String,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const AcademicDepartment = model<IAcademicDepartment>(
  "AcademicDepartment",
  AcademicDepartmentSchema
);

export default AcademicDepartment;
