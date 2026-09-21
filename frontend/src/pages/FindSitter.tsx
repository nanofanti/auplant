import { useEffect, useState } from "react";
import SitterCard from "../components/SitterCard";
import { getSitters } from "../services/sitterService";
import type { PlantSitter } from "../types/PlantSitter";

function FindSitter() {
  const [sitters, setSitters] = useState<PlantSitter[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadSitters = async () => {
      try {
        const response = await getSitters();
        setSitters(response.data);
      } catch (error) {
        console.error(error);
        setLoadError("Failed to load sitters");
      }
    };

    loadSitters();
  }, []);

  return (
    <>
      {sitters.map((sitter) => {
        return <SitterCard key={sitter._id} sitter={sitter} />;
      })}
      {loadError}
    </>
  );
}

export default FindSitter;
