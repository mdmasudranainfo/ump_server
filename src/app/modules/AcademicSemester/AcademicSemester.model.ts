import { model, Model, Schema } from "mongoose";
import IAcademicSemester from "./AcademicSemester.interface";
import { AcademicSemesterMonths } from "./AcademicSemester.constant";
import ApiError from "../../../error/ApiError";
import status from "http-status";

type AcademicSemesterModel = Model<IAcademicSemester, object>;

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ["Autumn", "Fall", "Summer"],
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ["01", "02", "03"],
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
academicSemesterSchema.pre("save", async function (next) {
  const isExit = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExit) {
    throw new ApiError(status.CONFLICT, "Academic semester already exists");
  } else {
    next();
  }
});
const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemester",
  academicSemesterSchema
);

export default AcademicSemester;
