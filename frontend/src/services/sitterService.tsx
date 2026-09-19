import type { SitterResponse } from "../types/PlantSitter";

export async function getSitters(): Promise<SitterResponse> {
  const response = await fetch("http://localhost:8080/api/sitters");

  if (!response.ok) {
    throw new Error("Failed to fetch sitters");
  }

  const data = await response.json();

  return data;
}
