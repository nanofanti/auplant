import mongoose from "mongoose";

interface ICareRequest {
  ownerId: mongoose.Types.ObjectId;
  location: string;
  startDate: Date;
  endDate: Date;
  numberOfPlants: number;
  description: string;
  photos: string[];
  offeredPrice: number;
  status: "open" | "closed";
}

const careRequestSchema = new mongoose.Schema<ICareRequest>(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    numberOfPlants: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      default: [],
    },
    offeredPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  },
);

const CareRequest = mongoose.model<ICareRequest>(
  "CareRequest",
  careRequestSchema,
);

export default CareRequest;
