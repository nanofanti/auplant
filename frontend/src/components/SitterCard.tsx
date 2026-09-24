import type { PlantSitter } from "../types/PlantSitter";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { createOrGetConversation } from "../services/messageService";

type SitterCardProps = {
  sitter: PlantSitter;
};

function SitterCard({ sitter }: SitterCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleContactSitter = async () => {
    try {
      const response = await createOrGetConversation({
        recipientId: sitter.userId._id,
      });

      navigate(`/messages/${response.data._id}`);
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-auplant-sage p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Sitter header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {sitter.userId.profileImage ? (
            <img
              src={sitter.userId.profileImage}
              alt={`${sitter.userId.name}'s profile`}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-auplant-cream text-lg font-semibold text-auplant-dark">
              {sitter.userId.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <Link
              to={`/users/${sitter.userId._id}`}
              className="font-semibold text-auplant-dark hover:text-auplant-green"
            >
              {sitter.userId.name}
            </Link>

            {sitter.reviewCount > 0 ? (
              <p className="mt-1 text-sm font-medium text-auplant-green">
                ⭐ {sitter.averageRating.toFixed(1)}{" "}
                <span className="font-normal text-gray-500">
                  ({sitter.reviewCount}{" "}
                  {sitter.reviewCount === 1 ? "review" : "reviews"})
                </span>
              </p>
            ) : (
              <p className="mt-1 text-sm text-gray-500">No reviews yet</p>
            )}

            <p className="text-sm text-gray-600">{sitter.location}</p>
          </div>
        </div>

        {/* Availability */}
        <span
          className={
            sitter.availability
              ? "rounded-full bg-auplant-green px-3 py-1 text-sm font-medium text-white"
              : "rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600"
          }
        >
          {sitter.availability ? "Available" : "Not available"}
        </span>
      </div>

      {/* Bio */}
      <p className="mt-5 text-auplant-text-black">{sitter.bio}</p>

      {/* Experience */}
      <div className="mt-5">
        <p className="text-sm font-semibold text-auplant-green">Experience</p>

        <p className="mt-1 text-auplant-text-black">{sitter.experience}</p>
      </div>

      {/* Services */}
      <div className="mt-5">
        <p className="text-sm font-semibold text-auplant-green">Services</p>

        <div className="mt-2 flex flex-wrap gap-2">
          {sitter.services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-auplant-cream px-3 py-1 text-sm text-auplant-green"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Price + Contact */}
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-auplant-olive pt-4">
        <div>
          <span className="text-2xl font-bold text-auplant-green">
            {sitter.pricePerDay} €
          </span>

          <span className="ml-1 text-sm text-gray-600">/ day</span>
        </div>

        {user?._id !== sitter.userId._id && (
          <button
            type="button"
            onClick={handleContactSitter}
            disabled={!sitter.availability}
            className="cursor-pointer rounded-lg bg-auplant-green px-5 py-2.5 font-semibold text-white transition-colors hover:bg-auplant-dark disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          >
            Contact Sitter
          </button>
        )}
      </div>
    </div>
  );
}

export default SitterCard;
