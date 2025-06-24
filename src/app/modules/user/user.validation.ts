import { z } from "zod";

const createUserValidatorZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: "Role is requiredxxx",
    }),
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidatorZodSchema,
};
