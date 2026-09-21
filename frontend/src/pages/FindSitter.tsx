import { useEffect, useState } from "react";

import SitterCard from "../components/SitterCard";

import { getSitters } from "../services/sitterService";

import type { PlantSitter } from "../types/PlantSitter";

function FindSitter() {
  const [sitters, setSitters] = useState<PlantSitter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSitters = async () => {
      try {
        const response = await getSitters();

        setSitters(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load plant sitters");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSitters();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-gray-600">Loading plant sitters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Find a Plant Sitter
        </h1>

        <p className="mt-2 text-gray-600">
          Find someone nearby to take care of your plants while you're away.
        </p>
      </div>

      {sitters.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">
            No plant sitters are available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {sitters.map((sitter) => (
            <SitterCard key={sitter._id} sitter={sitter} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FindSitter;
