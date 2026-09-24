import type { PublicUser, PublicUserResponse } from "../types/PublicUser";

export const getPublicUser = async (userId: string): Promise<PublicUser> => {
  const response = await fetch(
    `http://localhost:8080/api/users/${userId}/public`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data: PublicUserResponse = await response.json();

  return data.data;
};
