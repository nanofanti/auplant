import type {
  SitterResponse,
  CreateSitterData,
  CreateSitterResponse,
  SitterProfileResponse,
  UpdateSitterData,
} from "../types/PlantSitter";

export async function getSitters(): Promise<SitterResponse> {
  const response = await fetch("http://localhost:8080/api/sitters");

  if (!response.ok) {
    throw new Error("Failed to fetch sitters");
  }

  const data = await response.json();

  return data;
}

export async function createSitter(
  sitterData: CreateSitterData,
): Promise<CreateSitterResponse> {
  const response = await fetch("http://localhost:8080/api/sitters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(sitterData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create sitter profile");
  }

  return data;
}

export async function getMySitterProfile(): Promise<SitterProfileResponse | null> {
  const response = await fetch("http://localhost:8080/api/sitters/me", {
    credentials: "include",
  });

  const data = await response.json();

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch sitter profile");
  }

  return data;
}

export async function updateSitterProfile(
  id: string,
  updates: UpdateSitterData,
): Promise<SitterProfileResponse> {
  const response = await fetch(`http://localhost:8080/api/sitters/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updates),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update sitter profile");
  }

  return data;
}
