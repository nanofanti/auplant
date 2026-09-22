import type { CareRequest } from "../types/CareRequest";
import { formatDate } from "../utils/formatDate";

type CareRequestCardProps = {
  careRequest: CareRequest;
};

function CareRequestCard({ careRequest }: CareRequestCardProps) {
  return (
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
          <h2 className="text-xl font-semibold">{careRequest.ownerId.name}</h2>
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
            <img
              key={photo}
              src={photo}
              alt={`Plant ${index + 1}`}
              className={`h-48 w-full rounded-xl object-cover ${
                index === 0 && careRequest.photos.length > 1 ? "col-span-2" : ""
              }`}
            />
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
  );
}

export default CareRequestCard;
