import type { LoginResponse, GetMeResponse } from "../types/Auth";

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  return data;
}

export async function getMe(): Promise<GetMeResponse> {
  const response = await fetch("http://localhost:8080/api/auth/me", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("You are not authorized");
  }

  const data = await response.json();

  return data;
}
