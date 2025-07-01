import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  mongodb_uri: process.env.MONGO_URI,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration_days: process.env.JWT_EXPIRATION_DAYS || "7d",
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expiration_days: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
