import { useEffect, useState } from "react";
import type { CareRequest } from "../types/CareRequest";
import { getCareRequests } from "../services/careRequestService";
import CareRequestCard from "../components/CareRequestCard";

function CareRequests() {
  const [careRequests, setCareRequests] = useState<CareRequest[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    const loadCareRequests = async () => {
      try {
        const response = await getCareRequests();
        setCareRequests(response.data);
      } catch (error) {
        console.error(error);
        setLoadError("Failed to load care requests");
      } finally {
        setLoading(false);
      }
    };

    loadCareRequests();
  }, []);

  //Filter logic
  const filteredCareRequests = careRequests.filter((careRequest) => {
    return careRequest.location
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());
  });

  //Location suggestion
  const locationSuggestions = [
    ...new Set(
      careRequests
        .map((careRequest) => careRequest.location)
        .filter((location) =>
          location.toLowerCase().startsWith(searchTerm.toLowerCase()),
        ),
    ),
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Plant Care Requests</h1>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setShowSuggestions(true);
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />

        {showSuggestions &&
          searchTerm.length > 0 &&
          locationSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
              {locationSuggestions.map((location) => {
                return (
                  <li key={location}>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm(location);
                        setShowSuggestions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      {location}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {loading ? (
          <h2>Loading care requests</h2>
        ) : loadError ? (
          <h2>{loadError}</h2>
        ) : careRequests.length === 0 ? (
          <div>
            <h2>No care requests available</h2>
          </div>
        ) : filteredCareRequests.length === 0 ? (
          <h2>No care requests for "{searchTerm}"</h2>
        ) : (
          filteredCareRequests.map((filteredCareRequest) => {
            return (
              <CareRequestCard
                key={filteredCareRequest._id}
                careRequest={filteredCareRequest}
              />
            );
          })
        )}
      </div>
    </main>
  );
}

export default CareRequests;
