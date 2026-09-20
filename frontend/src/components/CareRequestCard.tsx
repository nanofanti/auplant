import type { CareRequest } from "../types/CareRequest";

type CareRequestCardProps = {
  careRequest: CareRequest;
};

function CareRequestCard({ careRequest }: CareRequestCardProps) {
  return (
    <div>
      <p>{careRequest.ownerId.name}</p>
      <p>{careRequest.location}</p>
      <p>{careRequest.startDate}</p>
      <p>{careRequest.endDate}</p>
      <p>{careRequest.numberOfPlants}</p>
      <p>{careRequest.description}</p>
      <p>{careRequest.offeredPrice}</p>
      <p>{careRequest.status}</p>
    </div>
  );
}

export default CareRequestCard;
