export interface ReviewUser {
  _id: string;
  name: string;
  profileImage?: string;
}

export interface Review {
  _id: string;
  reviewerId: ReviewUser;
  reviewedUserId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsData {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

export interface ReviewsResponse {
  message: string;
  data: ReviewsData;
}

export interface CreateReviewData {
  reviewedUserId: string;
  rating: number;
  comment?: string;
}

export interface CreateReviewResponse {
  message: string;
  data: Review;
}
