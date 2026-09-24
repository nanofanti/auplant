import type {
  CreateReviewData,
  CreateReviewResponse,
  ReviewsData,
  ReviewsResponse,
  Review,
  UpdateReviewData,
} from "../types/Review";

export const getReviewsForUser = async (
  userId: string,
): Promise<ReviewsData> => {
  const response = await fetch(
    `http://localhost:8080/api/reviews/user/${userId}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const data: ReviewsResponse = await response.json();

  return data.data;
};

export const createReview = async (
  reviewData: CreateReviewData,
): Promise<Review> => {
  const response = await fetch("http://localhost:8080/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Failed to create review");
  }

  const data: CreateReviewResponse = await response.json();

  return data.data;
};

export const updateReview = async (
  reviewId: string,
  reviewData: UpdateReviewData,
): Promise<Review> => {
  const response = await fetch(
    `http://localhost:8080/api/reviews/${reviewId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(reviewData),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Failed to update review");
  }

  const data: CreateReviewResponse = await response.json();

  return data.data;
};

export const deleteReview = async (reviewId: string): Promise<void> => {
  const response = await fetch(
    `http://localhost:8080/api/reviews/${reviewId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Failed to delete review");
  }
};
