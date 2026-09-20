import type { CareRequest } from "../types/CareRequest";
import { formatDate } from "../utils/formatDate";

type CareRequestCardProps = {
  careRequest: CareRequest;
};

function CareRequestCard({ careRequest }: CareRequestCardProps) {
  return (
    <div className="rounded-xl border border-gray-500 p-6 m-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{careRequest.ownerId.name}</h2>
        <span
          className={
            careRequest.status === "open"
              ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
              : "rounded-full bg-gray-100 px-3 py-1 text-sm text-green-700"
          }
        >
          {careRequest.status}
        </span>
      </div>

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
  );
}

export default CareRequestCard;
