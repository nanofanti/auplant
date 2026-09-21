import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { updateSitterProfile } from "../services/sitterService";
import { useNavigate } from "react-router-dom";

function EditSitterProfile() {
  const { sitterProfile, refreshSitterProfile } = useAuth();

  const [formData, setFormData] = useState({
    location: sitterProfile?.location ?? "",
    bio: sitterProfile?.bio ?? "",
    experience: sitterProfile?.experience ?? "",
    pricePerDay: sitterProfile?.pricePerDay ?? 0,
    availability: sitterProfile?.availability ?? false,
    services: sitterProfile?.services.join(", ") ?? "",
  });

  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!sitterProfile) {
      return;
    }

    try {
      const servicesArray = formData.services
        .split(",")
        .map((service) => service.trim())
        .filter((service) => service !== "");

      await updateSitterProfile(sitterProfile._id, {
        location: formData.location,
        bio: formData.bio,
        experience: formData.experience,
        pricePerDay: formData.pricePerDay,
        availability: formData.availability,
        services: servicesArray,
      });

      await refreshSitterProfile();

      toast.success("Sitter profile updated successfully");

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update sitter profile");
      }
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Edit Sitter Profile</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Location
          <input
            type="text"
            value={formData.location}
            onChange={handleChange}
          />
        </label>

        <label>
          Bio
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </label>

        <label>
          Experience
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </label>

        <label>
          Price per day
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
          />
        </label>

        <label>
          Available
          <input
            type="checkbox"
            checked={formData.availability}
            onChange={(event) =>
              setFormData((currentData) => ({
                ...currentData,
                availability: event.target.checked,
              }))
            }
          />
        </label>

        <label>
          Services
          <input
            type="text"
            name="services"
            value={formData.services}
            onChange={handleChange}
            placeholder="e.g. watering, repotting, plant check-ins"
          />
        </label>
        <button
          type="submit"
          className="mt-6 rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}

export default EditSitterProfile;
