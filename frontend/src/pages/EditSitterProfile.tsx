import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import {
  updateSitterProfile,
  deleteSitterProfile,
} from "../services/sitterService";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

const availableServices = [
  { value: "watering", label: "Watering" },
  { value: "plant check-ins", label: "Plant check-ins" },
  { value: "repotting", label: "Repotting" },
  { value: "fertilizing", label: "Fertilizing" },
  { value: "pruning", label: "Pruning" },
  { value: "pest inspection", label: "Pest inspection" },
];

function EditSitterProfile() {
  const { sitterProfile, refreshSitterProfile, refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    location: sitterProfile?.location ?? "",
    bio: sitterProfile?.bio ?? "",
    experience: sitterProfile?.experience ?? "",
    pricePerDay: sitterProfile?.pricePerDay ?? 0,
    availability: sitterProfile?.availability ?? false,
    services: sitterProfile?.services ?? [],
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleServiceChange = (service: string) => {
    setFormData((currentData) => ({
      ...currentData,
      services: currentData.services.includes(service)
        ? currentData.services.filter(
            (currentService) => currentService !== service,
          )
        : [...currentData.services, service],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!sitterProfile) {
      return;
    }

    try {
      await updateSitterProfile(sitterProfile._id, {
        location: formData.location,
        bio: formData.bio,
        experience: formData.experience,
        pricePerDay: formData.pricePerDay,
        availability: formData.availability,
        services: formData.services,
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

  const handleDelete = async () => {
    if (!sitterProfile) {
      return;
    }

    try {
      await deleteSitterProfile(sitterProfile._id);

      await refreshUser();
      await refreshSitterProfile();

      toast.success("Sitter profile deleted successfully");

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete sitter profile");
      }
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Sitter Profile
          </h1>

          <p className="mt-2 text-gray-600">
            Update the information people will see when looking for a plant
            sitter.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="location"
              className="mb-2 block font-medium text-gray-700"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="mb-2 block font-medium text-gray-700"
            >
              Bio
            </label>

            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="experience"
              className="mb-2 block font-medium text-gray-700"
            >
              Experience
            </label>

            <input
              id="experience"
              name="experience"
              type="text"
              value={formData.experience}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="pricePerDay"
              className="mb-2 block font-medium text-gray-700"
            >
              Price per day (€)
            </label>

            <input
              id="pricePerDay"
              name="pricePerDay"
              type="number"
              min="0"
              value={formData.pricePerDay}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <fieldset>
              <legend className="mb-3 font-medium text-gray-700">
                Services
              </legend>

              <div className="grid gap-3 sm:grid-cols-2">
                {availableServices.map((service) => (
                  <label
                    key={service.value}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service.value)}
                      onChange={() => handleServiceChange(service.value)}
                      className="h-4 w-4 accent-green-700"
                    />

                    <span>{service.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <input
              id="availability"
              type="checkbox"
              checked={formData.availability}
              onChange={(event) =>
                setFormData((currentData) => ({
                  ...currentData,
                  availability: event.target.checked,
                }))
              }
              className="h-5 w-5 accent-green-700"
            />

            <label htmlFor="availability" className="font-medium text-gray-700">
              I'm currently available for plant sitting
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-800"
            >
              Save Changes
            </button>
          </div>
        </form>
        <section className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>

          <p className="mt-2 text-sm text-gray-600">
            Deleting your sitter profile will remove your sitter information.
            This action cannot be undone.
          </p>

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="mt-4 cursor-pointer rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
          >
            Delete Sitter Profile
          </button>
        </section>
        {showDeleteModal && (
          <ConfirmModal
            title="Delete sitter profile?"
            message="This action cannot be undone."
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </main>
  );
}

export default EditSitterProfile;
