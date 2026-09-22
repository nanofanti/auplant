import { useState, useEffect } from "react";
import type { CareRequest } from "../types/CareRequest";
import { formatDate } from "../utils/formatDate";

type CareRequestCardProps = {
  careRequest: CareRequest;
};

function CareRequestCard({ careRequest }: CareRequestCardProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhotoIndex(null);
      }

      if (event.key === "ArrowLeft" && careRequest.photos.length > 1) {
        setSelectedPhotoIndex((currentIndex) => {
          if (currentIndex === null) return null;

          return currentIndex === 0
            ? careRequest.photos.length - 1
            : currentIndex - 1;
        });
      }

      if (event.key === "ArrowRight" && careRequest.photos.length > 1) {
        setSelectedPhotoIndex((currentIndex) => {
          if (currentIndex === null) return null;

          return currentIndex === careRequest.photos.length - 1
            ? 0
            : currentIndex + 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhotoIndex, careRequest.photos.length]);

  const showPreviousPhoto = () => {
    if (selectedPhotoIndex === null) return;

    setSelectedPhotoIndex(
      selectedPhotoIndex === 0
        ? careRequest.photos.length - 1
        : selectedPhotoIndex - 1,
    );
  };

  const showNextPhoto = () => {
    if (selectedPhotoIndex === null) return;

    setSelectedPhotoIndex(
      selectedPhotoIndex === careRequest.photos.length - 1
        ? 0
        : selectedPhotoIndex + 1,
    );
  };

  return (
    <>
      <div className="rounded-xl border border-gray-500 p-6 m-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {careRequest.ownerId.profileImage ? (
              <img
                src={careRequest.ownerId.profileImage}
                alt={`${careRequest.ownerId.name}'s profile`}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-800">
                {careRequest.ownerId.name.charAt(0).toUpperCase()}
              </div>
            )}
            <h2 className="text-xl font-semibold">
              {careRequest.ownerId.name}
            </h2>
          </div>

          <span
            className={
              careRequest.status === "open"
                ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                : "rounded-full bg-red-300 px-3 py-1 text-sm"
            }
          >
            {careRequest.status}
          </span>
        </div>
        {careRequest.photos.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-2">
            {careRequest.photos.map((photo, index) => (
              <button
                key={photo.publicId}
                type="button"
                onClick={() => setSelectedPhotoIndex(index)}
                className={`cursor-pointer overflow-hidden rounded-xl ${
                  index === 0 && careRequest.photos.length > 1
                    ? "col-span-2"
                    : ""
                }`}
              >
                <img
                  src={photo.url}
                  alt={`Plant ${index + 1}`}
                  className="h-48 w-full object-cover transition-transform hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}
        <div className="mt-5 space-y-2">
          <p>
            <strong>Location: </strong>
            {careRequest.location}
          </p>

          <div className="flex gap-6">
            <p>
              <strong>From:</strong> {formatDate(careRequest.startDate)}
            </p>

            <p>
              <strong>To:</strong> {formatDate(careRequest.endDate)}
            </p>
          </div>

          <p>
            <strong>Number of plants: </strong>
            {careRequest.numberOfPlants}
          </p>

          <p>
            <strong>Description: </strong>
            {careRequest.description}
          </p>

          <p>
            <strong>Offered price: </strong>
            {careRequest.offeredPrice} €
          </p>
        </div>
      </div>
      {/* Lightbox */}
      {selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute right-6 top-6 cursor-pointer text-3xl text-white"
            aria-label="Close image"
          >
            ×
          </button>

          <div
            className="relative flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Previous */}
            {careRequest.photos.length > 1 && (
              <button
                type="button"
                onClick={showPreviousPhoto}
                className="fixed left-6 cursor-pointer text-5xl text-white"
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {/* Current image */}
            <img
              src={careRequest.photos[selectedPhotoIndex].url}
              alt={`Plant ${selectedPhotoIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            />

            {/* Next */}
            {careRequest.photos.length > 1 && (
              <button
                type="button"
                onClick={showNextPhoto}
                className="fixed right-6 cursor-pointer text-5xl text-white"
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CareRequestCard;
