import { z } from "zod";

const CreateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Year must be a String",
    }),
  }),
});

export default CreateAcademicFacultyZodSchema;
