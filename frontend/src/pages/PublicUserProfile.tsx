import { useEffect, useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { getPublicUser } from "../services/publicUserService";
import {
  createReview,
  getReviewsForUser,
  updateReview,
  deleteReview,
} from "../services/reviewService";

import type { PublicUser } from "../types/PublicUser";
import type { ReviewsData } from "../types/Review";
import PageHero from "../components/PageHero";
import instructionBanner from "../assets/banners/instructions-banner.png";

const PublicUserProfile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await getPublicUser(userId);
        setUser(response);
      } catch (error) {
        console.error("Failed to load user profile", error);
        setError("Failed to load user profile");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchReviews = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await getReviewsForUser(userId);
        setReviewsData(response);
      } catch (error) {
        console.error("Failed to load reviews", error);
      }
    };

    fetchUser();
    fetchReviews();
  }, [userId]);

  const handleSubmitReview = async () => {
    if (!userId) {
      return;
    }

    try {
      setIsSubmittingReview(true);
      setReviewError(null);

      if (currentUserReview) {
        await updateReview(currentUserReview._id, {
          rating,
          comment,
        });
      } else {
        await createReview({
          reviewedUserId: userId,
          rating,
          comment,
        });
      }

      const updatedReviews = await getReviewsForUser(userId);

      setReviewsData(updatedReviews);

      setShowReviewForm(false);
      setRating(5);
      setComment("");
    } catch (error) {
      if (error instanceof Error) {
        setReviewError(error.message);
      } else {
        setReviewError("Failed to create review");
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!currentUserReview || !userId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your review?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteReview(currentUserReview._id);

      const updatedReviews = await getReviewsForUser(userId);

      setReviewsData(updatedReviews);
    } catch (error) {
      if (error instanceof Error) {
        setReviewError(error.message);
      } else {
        setReviewError("Failed to delete review");
      }
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-auplant-cream px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-auplant-dark">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-auplant-cream px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-red-700">{error}</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-auplant-cream px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-auplant-dark">User not found.</p>
        </div>
      </main>
    );
  }

  const currentUserReview = reviewsData?.reviews.find(
    (review) => review.reviewerId._id === currentUser?._id,
  );

  const handleEditReview = () => {
    if (!currentUserReview) {
      return;
    }

    setRating(currentUserReview.rating);
    setComment(currentUserReview.comment ?? "");
    setReviewError(null);
    setShowReviewForm(true);
  };

  return (
    <main className="bg-auplant-cream">
      <PageHero
        image={instructionBanner}
        eyebrow="User"
        title={`Find more about ${user.name}`}
        description="Info & reviews"
      />
      <div className="mx-auto max-w-6xl py-16">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-5 inline-flex cursor-pointer items-center gap-2 font-medium text-auplant-green transition hover:text-auplant-dark"
        >
          ← Go back
        </button>
        {/* Profile header */}
        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-auplant-sage text-3xl font-bold text-auplant-dark">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold text-auplant-dark">
                {user.name}
              </h1>

              {/* Roles */}
              <div className="mt-2 flex flex-wrap gap-2">
                {user.roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full bg-auplant-sage px-3 py-1 text-sm font-medium capitalize text-auplant-dark"
                  >
                    {role}
                  </span>
                ))}
              </div>

              {/* Rating summary */}
              {reviewsData && reviewsData.reviewCount > 0 && (
                <p className="mt-3 font-medium text-auplant-green">
                  ⭐ {reviewsData.averageRating.toFixed(1)}{" "}
                  <span className="font-normal text-gray-600">
                    ({reviewsData.reviewCount}{" "}
                    {reviewsData.reviewCount === 1 ? "review" : "reviews"})
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8 border-t border-auplant-sage pt-6">
            <h2 className="text-xl font-semibold text-auplant-dark">About</h2>

            {user.bio ? (
              <p className="mt-2 leading-relaxed text-gray-700">{user.bio}</p>
            ) : (
              <p className="mt-2 text-gray-500">No bio added yet.</p>
            )}
          </div>
        </section>

        {/* Write review button */}
        {currentUser && currentUser._id !== user._id && !currentUserReview && (
          <button
            type="button"
            onClick={() => setShowReviewForm(true)}
            className="mt-6 rounded-full bg-auplant-green px-5 py-2.5 font-medium text-white transition hover:bg-auplant-dark"
          >
            Write a Review
          </button>
        )}

        {currentUser && currentUser._id !== user._id && currentUserReview && (
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleEditReview}
              className="rounded-full bg-auplant-green px-5 py-2.5 font-medium text-white transition hover:bg-auplant-dark"
            >
              Edit Your Review
            </button>

            <button
              type="button"
              onClick={handleDeleteReview}
              className="rounded-full border border-red-600 px-5 py-2.5 font-medium text-red-700 transition hover:bg-red-50"
            >
              Delete Review
            </button>
          </div>
        )}

        {/* Review form */}
        {showReviewForm && (
          <div className="mt-6 rounded-2xl border border-auplant-sage bg-white p-6">
            <h2 className="text-xl font-semibold text-auplant-dark">
              {currentUserReview ? "Edit Your Review" : "Write a Review"}
            </h2>

            <p className="mt-4 text-sm font-medium text-gray-700">
              Your rating
            </p>

            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-3xl text-auplant-olive transition hover:scale-110"
                  aria-label={`Rate ${star} out of 5`}
                >
                  {star <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>

            <p className="mt-2 text-sm text-gray-500">{rating} out of 5</p>

            <label
              htmlFor="review-comment"
              className="mt-5 block text-sm font-medium text-gray-700"
            >
              Comment
            </label>

            <textarea
              id="review-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="Share your experience..."
              className="mt-2 w-full resize-none rounded-xl border border-auplant-sage p-3 outline-none focus:border-auplant-green"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {comment.length}/1000
            </p>

            {reviewError && (
              <p className="mt-3 text-sm text-red-700">{reviewError}</p>
            )}

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleSubmitReview}
                disabled={isSubmittingReview}
                className="rounded-full bg-auplant-green px-5 py-2.5 font-medium text-white transition hover:bg-auplant-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmittingReview
                  ? "Saving..."
                  : currentUserReview
                    ? "Save Changes"
                    : "Submit Review"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowReviewForm(false);
                  setReviewError(null);
                }}
                className="rounded-full px-5 py-2.5 font-medium text-auplant-green transition hover:bg-auplant-sage/40"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Reviews */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-auplant-dark">Reviews</h2>

          {reviewsData && reviewsData.reviewCount > 0 ? (
            <div className="mt-4 space-y-4">
              {reviewsData.reviews.map((review) => (
                <article
                  key={review._id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/users/${review.reviewerId._id}`}
                      aria-label={`View ${review.reviewerId.name}'s profile`}
                      className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-auplant-green"
                    >
                      {review.reviewerId.profileImage ? (
                        <img
                          src={review.reviewerId.profileImage}
                          alt={`${review.reviewerId.name}'s profile`}
                          className="h-12 w-12 rounded-full object-cover transition hover:opacity-80"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-auplant-sage font-bold text-auplant-dark transition hover:bg-auplant-olive">
                          {review.reviewerId.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </Link>

                    <div>
                      <Link
                        to={`/users/${review.reviewerId._id}`}
                        className="font-semibold text-auplant-dark transition hover:text-auplant-green hover:underline"
                      >
                        {review.reviewerId.name}
                      </Link>

                      <p className="text-sm text-auplant-green">
                        ⭐ {review.rating}/5
                      </p>
                    </div>
                  </div>

                  {review.comment && (
                    <p className="mt-4 leading-relaxed text-gray-700">
                      {review.comment}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">No reviews yet.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default PublicUserProfile;
