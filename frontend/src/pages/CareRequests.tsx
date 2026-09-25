import { useEffect, useState } from "react";
import type { CareRequest } from "../types/CareRequest";
import { getCareRequests } from "../services/careRequestService";
import CareRequestCard from "../components/CareRequestCard";
import instructionBanner from "../assets/banners/instructions-banner.png";
import PageHero from "../components/PageHero";

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
    <main className="bg-auplant-cream">
      <PageHero
        image={instructionBanner}
        eyebrow="Plant owners"
        title="Plant Care Requests"
        description="Find plant owners who are looking for someone to take care of their
          plants while they're away."
      />

      <div className="mx-auto max-w-6xl py-16">
        {/* Filters */}
        <section className="mb-8 rounded-2xl border border-gray-200 bg-auplant-cream p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-auplant-dark">
                Find a care request
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Filter requests by location, status, price or date.
              </p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="cursor-pointer text-sm font-semibold text-auplant-green transition-colors hover:text-auplant-dark"
            >
              Clear filters
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Location */}
            <div className="relative">
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-auplant-green"
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                placeholder="e.g. Heidelberg"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setShowSuggestions(true);
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-auplant-green"
              />

              {showSuggestions &&
                searchTerm.length > 0 &&
                locationSuggestions.length > 0 && (
                  <ul className="absolute z-10 mt-1 max-h-52 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    {locationSuggestions.map((location) => (
                      <li key={location}>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchTerm(location);
                            setShowSuggestions(false);
                          }}
                          className="w-full cursor-pointer px-4 py-2 text-left text-sm transition-colors hover:bg-auplant-sage"
                        >
                          {location}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-semibold text-auplant-green"
              >
                Status
              </label>

              <select
                id="status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-auplant-green"
              >
                <option value="all">All statuses</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="maxPrice"
                className="mb-2 block text-sm font-semibold text-auplant-green"
              >
                Maximum price
              </label>

              <div className="relative">
                <input
                  id="maxPrice"
                  type="number"
                  min="0"
                  placeholder="Any price"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 outline-none transition focus:border-auplant-green"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  €
                </span>
              </div>
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="neededOn"
                className="mb-2 block text-sm font-semibold text-auplant-green"
              >
                Needed on
              </label>

              <input
                id="neededOn"
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-auplant-green"
              />
            </div>
          </div>
        </section>

        {/* Results header */}
        {!loading && !loadError && careRequests.length > 0 && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-auplant-dark">
                {filteredCareRequests.length}
              </span>{" "}
              {filteredCareRequests.length === 1
                ? "request found"
                : "requests found"}
            </p>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="rounded-2xl border border-dashed border-auplant-sage bg-auplant-cream p-10 text-center">
            <h2 className="font-semibold text-auplant-dark">
              Loading care requests...
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              We're looking for plant owners who need some help.
            </p>
          </div>
        ) : loadError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="font-semibold text-red-700">{loadError}</h2>

            <p className="mt-2 text-sm text-gray-600">
              Please try again later.
            </p>
          </div>
        ) : careRequests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-auplant-sage bg-auplant-cream p-10 text-center">
            <h2 className="text-lg font-semibold text-auplant-dark">
              No care requests available
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              There aren't any plant care requests yet.
            </p>
          </div>
        ) : filteredCareRequests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-auplant-sage bg-auplant-cream p-10 text-center">
            <h2 className="text-lg font-semibold text-auplant-dark">
              No matching requests
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Try changing or clearing some of your filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 cursor-pointer font-semibold text-auplant-green transition-colors hover:text-auplant-dark"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCareRequests.map((careRequest) => (
              <CareRequestCard
                key={careRequest._id}
                careRequest={careRequest}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default CareRequests;
