import mongoose from "mongoose";

type UserRole = "owner" | "sitter";

interface IUser {
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
  profileImage?: string;
  profileImagePublicId?: string;
  isAdmin: boolean;
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
      default: ["owner"],
    },
    profileImage: {
      type: String,
    },
    profileImagePublicId: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
