import { z } from "zod";

const academicDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Year must be a String",
    }),
    academicFaculty: z.string({
      required_error: "Academic Faculty is required",
      invalid_type_error: "Year must be a String",
    }),
  }),
});

export default academicDepartmentZodValidation;
