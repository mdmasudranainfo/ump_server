import { z } from "zod";
import { USER_ROLE } from "../../../enums/user_enums";

const createUserValidatorZodSchema = z.object({
  body: z.object({
    role: z.enum(
      [
        USER_ROLE.ADMIN,
        USER_ROLE.FACULTY,
        USER_ROLE.STUDENT,
        USER_ROLE.SUPPER_ADMIN,
        USER_ROLE.USER,
      ],
      {
        required_error: "Role is required",
      }
    ),
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidatorZodSchema,
};
