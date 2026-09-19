import type {
  CreateCareRequestData,
  CreateCareRequestResponse,
} from "../types/CareRequest";

export async function createCareRequest(
  careRequestData: CreateCareRequestData,
): Promise<CreateCareRequestResponse> {
  const response = await fetch("http://localhost:8080/api/care-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(careRequestData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create care request");
  }

  return data;
}
