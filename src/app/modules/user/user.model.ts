import { model, Model, Schema } from "mongoose";
import IUser from "./user.interface";

type UserModel = Model<IUser, object>;

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model<IUser, UserModel>("User", userSchema);

export default User;
