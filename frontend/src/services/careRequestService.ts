import type {
  CareRequestsResponse,
  CareRequestResponse,
  CreateCareRequestResponse,
  CareRequestStatus,
} from "../types/CareRequest";

export async function createCareRequest(
  formData: FormData,
): Promise<CreateCareRequestResponse> {
  const response = await fetch("http://localhost:8080/api/care-requests", {
    method: "POST",
    credentials: "include",
    body: formData,
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

export async function deleteCareRequest(id: string) {
  const response = await fetch(
    `http://localhost:8080/api/care-requests/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete care request");
  }

  return data;
}

export async function updateCareRequest(
  id: string,
  formData: FormData,
): Promise<CareRequestResponse> {
  const response = await fetch(
    `http://localhost:8080/api/care-requests/${id}`,
    {
      method: "PATCH",
      credentials: "include",
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update care request");
  }

  return data;
}

export async function getCareRequestById(
  id: string,
): Promise<CareRequestResponse> {
  const response = await fetch(`http://localhost:8080/api/care-requests/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch care request");
  }

  return data;
}
