import { string, z } from "zod";
import { AcademicSemesterMonths } from "./AcademicSemester.constant";
const CreateAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(["Autumn", "Fall", "Summer"], {
      required_error: "Title is required",
      invalid_type_error:
        "Title must be one of the following: Autumn, Fall, Summer",
    }),
    year: z
      .string({
        required_error: "Year is required",
        invalid_type_error: "Year must be a number",
      })
      .min(2000)
      .max(2100),
    code: z.enum(["01", "02", "03"], {
      required_error: "Code is required",
      invalid_type_error: "Code must be one of the following: 01, 02, 03",
    }),
    startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: "Start month is required",
      invalid_type_error:
        "Start month must be one of the following: January, February, March, April, May, June, July, August, September, October, November, December",
    }),
    endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: "End month is required",
      invalid_type_error:
        "End month must be one of the following: January, February, March, April, May, June, July, August, September, October, November, December",
    }),
  }),
});

const UpdateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum(["Autumn", "Fall", "Summer"], {
          required_error: "Title is required",
          invalid_type_error:
            "Title must be one of the following: Autumn, Fall, Summer",
        })
        .optional(),
      year: z
        .string({
          required_error: "Year is required",
          invalid_type_error: "Year must be a String",
        })
        .optional(),
      code: z
        .enum(["01", "02", "03"], {
          required_error: "Code is required",
          invalid_type_error: "Code must be one of the following: 01, 02, 03",
        })
        .optional(),
      startMonth: z
        .enum([...AcademicSemesterMonths] as [string, ...string[]], {
          required_error: "Start month is required",
          invalid_type_error:
            "Start month must be one of the following: January, February, March, April, May, June, July, August, September, October, November, December",
        })
        .optional(),
      endMonth: z
        .enum([...AcademicSemesterMonths] as [string, ...string[]], {
          required_error: "End month is required",
          invalid_type_error:
            "End month must be one of the following: January, February, March, April, May, June, July, August, September, October, November, December",
        })
        .optional(),
    }),
  })
  .refine(
    (data) =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: "Either title or code must be provided",
    }
  );

export const AcademicSemesterValidation = {
  CreateAcademicSemesterZodSchema,
  UpdateAcademicSemesterZodSchema,
};
