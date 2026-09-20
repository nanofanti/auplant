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
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

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
    const locationMatches = careRequest.location
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());

    const statusMatches =
      statusFilter === "all" || careRequest.status === statusFilter;

    const priceMatches =
      maxPrice === "" || careRequest.offeredPrice <= Number(maxPrice);

    const dateMatches =
      selectedDate === "" ||
      (new Date(selectedDate) >= new Date(careRequest.startDate) &&
        new Date(selectedDate) <= new Date(careRequest.endDate));

    return locationMatches && statusMatches && priceMatches && dateMatches;
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

  //Clear filter logic
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setShowSuggestions(false);
    setMaxPrice("");
    setSelectedDate("");
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Plant Care Requests</h1>
      <div className="mb-8">
        <div className="flex gap-4">
          <div className="relative flex-1">
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
                  {locationSuggestions.map((location) => (
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
                  ))}
                </ul>
              )}
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3"
          >
            <option value="all">All statuses</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
          <input
            type="number"
            min="0"
            placeholder="Max price €"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3"
          />
          <label>
            Needed on
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3"
            />
          </label>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-100"
          >
            Clear all filters
          </button>
        </div>
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
