import { useEffect, useState } from "react";

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
      <article
        className={`overflow-hidden rounded-2xl border shadow-sm transition-all ${
          careRequest.status === "closed"
            ? "border-gray-300 bg-gray-100 opacity-70"
            : "border-gray-200 bg-auplant-sage hover:shadow-md"
        }`}
      >
        {/* Owner */}
        <div className="flex items-center justify-between gap-4 p-5">
          <div className="flex min-w-0 items-center gap-3">
            {careRequest.ownerId.profileImage ? (
              <img
                src={careRequest.ownerId.profileImage}
                alt={`${careRequest.ownerId.name}'s profile`}
                className="h-11 w-11 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-auplant-olive font-semibold text-auplant-dark">
                {careRequest.ownerId.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-auplant-olive">
                Plant owner
              </p>

              <h2 className="truncate text-lg font-semibold text-auplant-dark">
                {careRequest.ownerId.name}
              </h2>
            </div>
          </div>

          {/* Status */}
          <span
            className={
              careRequest.status === "open"
                ? "shrink-0 rounded-full bg-auplant-sage px-3 py-1 text-sm font-semibold text-auplant-dark"
                : "shrink-0 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700"
            }
          >
            {careRequest.status === "open" ? "Open" : "Closed"}
          </span>
        </div>

        {/* Photos */}
        {careRequest.photos.length > 0 && (
          <div
            className={`grid gap-1 px-5 ${
              careRequest.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {careRequest.photos.map((photo, index) => (
              <button
                key={photo.publicId}
                type="button"
                onClick={() => setSelectedPhotoIndex(index)}
                className={`group relative cursor-pointer overflow-hidden rounded-xl ${
                  index === 0 && careRequest.photos.length > 1
                    ? "col-span-2"
                    : ""
                }`}
              >
                <img
                  src={photo.url}
                  alt={`Plant ${index + 1}`}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              </button>
            ))}
          </div>
        )}

        {/* Main information */}
        <div className="p-5">
          {/* Location + price */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-auplant-green">
                Location
              </p>

              <p className="mt-1 font-medium text-auplant-dark">
                {careRequest.location}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Offered price</p>

              <p className="text-2xl font-bold text-auplant-green">
                {careRequest.offeredPrice} €
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-auplant-cream p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-auplant-olive">
                From
              </p>

              <p className="mt-1 font-semibold text-auplant-dark">
                {formatDate(careRequest.startDate)}
              </p>
            </div>

            <div className="rounded-xl bg-auplant-cream p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-auplant-olive">
                To
              </p>

              <p className="mt-1 font-semibold text-auplant-dark">
                {formatDate(careRequest.endDate)}
              </p>
            </div>
          </div>

          {/* Plants */}
          <div className="mt-5">
            <p className="text-sm font-semibold text-auplant-green">
              Plants to care for
            </p>

            <p className="mt-1 text-auplant-dark">
              {careRequest.numberOfPlants}{" "}
              {careRequest.numberOfPlants === 1 ? "plant" : "plants"}
            </p>
          </div>

          {/* Description */}
          <div className="mt-5 border-t border-gray-100 pt-5">
            <p className="text-sm font-semibold text-auplant-green">
              About this request
            </p>

            <p className="mt-2 leading-relaxed text-gray-600">
              {careRequest.description}
            </p>
          </div>

          {/* Contact Owner */}
          {careRequest.status === "open" && (
            <div className="mt-6 border-t border-auplant-olive pt-4">
              <button
                type="button"
                className="w-full cursor-pointer rounded-lg bg-auplant-green px-5 py-2.5 font-semibold text-white transition-colors hover:bg-auplant-dark"
              >
                Contact Owner
              </button>
            </div>
          )}
        </div>
      </article>

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
            className="absolute right-6 top-6 z-10 cursor-pointer text-3xl text-white transition-opacity hover:opacity-70"
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
                className="fixed left-6 cursor-pointer text-5xl text-white transition-opacity hover:opacity-70"
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
                className="fixed right-6 cursor-pointer text-5xl text-white transition-opacity hover:opacity-70"
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </div>

          {/* Image counter */}
          {careRequest.photos.length > 1 && (
            <div className="absolute bottom-6 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
              {selectedPhotoIndex + 1} / {careRequest.photos.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CareRequestCard;
