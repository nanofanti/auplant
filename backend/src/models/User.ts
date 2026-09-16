import mongoose from "mongoose";

type UserRole = "owner" | "sitter";

interface IUser {
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["owner", "sitter"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
