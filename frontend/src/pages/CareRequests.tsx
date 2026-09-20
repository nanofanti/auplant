import { useEffect, useState } from "react";
import type { CareRequest } from "../types/CareRequest";
import { getCareRequests } from "../services/careRequestService";
import CareRequestCard from "../components/CareRequestCard";

function CareRequests() {
  const [careRequests, setCareRequests] = useState<CareRequest[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadCareRequests = async () => {
      try {
        const response = await getCareRequests();
        setCareRequests(response.data);
      } catch (error) {
        console.error(error);
        setLoadError("Failed to load care requests");
      }
    };

    loadCareRequests();
  }, []);

  return (
    <>
      <h1>Plant Care Requests</h1>

      {careRequests.map((careRequest) => {
        return (
          <CareRequestCard key={careRequest._id} careRequest={careRequest} />
        );
      })}

      {loadError}
    </>
  );
}

export default CareRequests;
