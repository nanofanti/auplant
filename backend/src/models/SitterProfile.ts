import mongoose from "mongoose";

interface ISitterProfile {
  userId: mongoose.Types.ObjectId;
  location: string;
  bio: string;
  experience: string;
  pricePerDay: number;
  availability: boolean;
  services: string[];
}

const sitterProfileSchema = new mongoose.Schema<ISitterProfile>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },

    pricePerDay: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    services: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SitterProfile = mongoose.model<ISitterProfile>(
  "SitterProfile",
  sitterProfileSchema,
);

export default SitterProfile;
