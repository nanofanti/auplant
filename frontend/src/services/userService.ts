export async function uploadProfileImage(file: File) {
  const formData = new FormData();

  formData.append("profileImage", file);

  const response = await fetch(
    "http://localhost:8080/api/users/profile-image",
    {
      method: "PATCH",
      credentials: "include",
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload profile image");
  }

  return data;
}
