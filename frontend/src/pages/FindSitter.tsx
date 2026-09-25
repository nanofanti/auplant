import { useEffect, useState } from "react";

import SitterCard from "../components/SitterCard";
import PageHero from "../components/PageHero";

import { getSitters } from "../services/sitterService";

import type { PlantSitter } from "../types/PlantSitter";

import instructionBanner from "../assets/banners/instructions-banner.png";

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
    <main className="bg-auplant-cream">
      <PageHero
        image={instructionBanner}
        eyebrow="The search begins now"
        title="Find a Plant Sitter"
        description="Find someone nearby to take care of your plants while you're away."
      />

      <div className="mx-auto max-w-6xl py-16">
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
    </main>
  );
}

export default FindSitter;
