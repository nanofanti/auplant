import mongoose from "mongoose";

interface IReview {
  reviewerId: mongoose.Types.ObjectId;
  reviewedUserId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviewedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index(
  {
    reviewerId: 1,
    reviewedUserId: 1,
  },
  {
    unique: true,
  },
);

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
