import type {
  CareRequestsResponse,
  CreateCareRequestData,
  CreateCareRequestResponse,
  CareRequestStatus,
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

export async function getCareRequests(): Promise<CareRequestsResponse> {
  const response = await fetch("http://localhost:8080/api/care-requests");

  if (!response.ok) {
    throw new Error("Failed to fetch care requests");
  }

  const data = await response.json();

  return data;
}

export async function getMyCareRequests(): Promise<CareRequestsResponse> {
  const response = await fetch("http://localhost:8080/api/care-requests/me", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user care requests");
  }

  const data = await response.json();

  return data;
}

export async function updateCareRequestStatus(
  id: string,
  status: CareRequestStatus,
) {
  const response = await fetch(
    `http://localhost:8080/api/care-requests/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update care request");
  }

  return data;
}
