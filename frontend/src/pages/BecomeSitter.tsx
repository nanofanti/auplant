import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../context/AuthContext";
import { createSitter } from "../services/sitterService";
import type { CreateSitterData } from "../types/PlantSitter";

const availableServices = [
  { value: "watering", label: "Watering" },
  { value: "plant check-ins", label: "Plant check-ins" },
  { value: "repotting", label: "Repotting" },
  { value: "fertilizing", label: "Fertilizing" },
  { value: "pruning", label: "Pruning" },
  { value: "pest inspection", label: "Pest inspection" },
];

function BecomeSitter() {
  const navigate = useNavigate();
  const { refreshSitterProfile, refreshUser } = useAuth();

  const [location, setLocation] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [pricePerDay, setPricePerDay] = useState<number>(0);
  const [availability, setAvailability] = useState<boolean>(true);
  const [services, setServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sitterData: CreateSitterData = {
      location,
      bio,
      experience,
      pricePerDay,
      availability,
      services,
    };

    try {
      setIsSubmitting(true);

      await createSitter(sitterData);

      await refreshUser();
      await refreshSitterProfile();

      toast.success("Sitter profile created successfully");

      setLocation("");
      setBio("");
      setExperience("");
      setPricePerDay(0);
      setAvailability(true);
      setServices([]);

      setTimeout(() => {
        navigate("/find-sitter");
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create a sitter profile");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceChange = (service: string) => {
    setServices((currentServices) =>
      currentServices.includes(service)
        ? currentServices.filter((currentService) => currentService !== service)
        : [...currentServices, service],
    );
  };

  return (
    <div className="bg-auplant-cream px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-auplant-green">
            Join the AuPlant community
          </p>

          <h1 className="text-3xl font-bold text-auplant-dark sm:text-4xl">
            Become a Plant Sitter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Create your sitter profile and help plant owners take care of their
            plants while they're away.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl border border-auplant-sage bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="mb-2 block font-semibold text-auplant-dark"
            >
              Location
            </label>

            <input
              id="location"
              type="text"
              required
              placeholder="e.g. Heidelberg"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="w-full rounded-xl border border-auplant-sage px-4 py-3 text-auplant-dark outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
            />

            <p className="mt-1.5 text-sm text-gray-500">
              Where are you available to take care of plants?
            </p>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="mb-2 block font-semibold text-auplant-dark"
            >
              About you
            </label>

            <textarea
              id="bio"
              required
              rows={4}
              placeholder="Tell plant owners a little about yourself..."
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              className="w-full resize-none rounded-xl border border-auplant-sage px-4 py-3 text-auplant-dark outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
            />
          </div>

          {/* Experience */}
          <div>
            <label
              htmlFor="experience"
              className="mb-2 block font-semibold text-auplant-dark"
            >
              Plant care experience
            </label>

            <textarea
              id="experience"
              required
              rows={4}
              placeholder="Describe your experience with plants and plant care..."
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              className="w-full resize-none rounded-xl border border-auplant-sage px-4 py-3 text-auplant-dark outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="pricePerDay"
              className="mb-2 block font-semibold text-auplant-dark"
            >
              Price per day
            </label>

            <div className="relative">
              <input
                id="pricePerDay"
                type="number"
                required
                min="0"
                step="1"
                placeholder="20"
                value={pricePerDay}
                onChange={(event) => setPricePerDay(Number(event.target.value))}
                className="w-full rounded-xl border border-auplant-sage px-4 py-3 pr-16 text-auplant-dark outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
              />

              <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-gray-500">
                € / day
              </span>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between rounded-xl border border-auplant-sage bg-auplant-cream p-4">
            <div>
              <label
                htmlFor="availability"
                className="font-semibold text-auplant-dark"
              >
                Available for plant sitting
              </label>

              <p className="mt-1 text-sm text-gray-500">
                Your profile can be contacted by plant owners when you're
                available.
              </p>
            </div>

            <input
              id="availability"
              type="checkbox"
              checked={availability}
              onChange={(event) => setAvailability(event.target.checked)}
              className="h-5 w-5 cursor-pointer accent-auplant-green"
            />
          </div>

          {/* Services */}
          <fieldset>
            <legend className="font-semibold text-auplant-dark">
              Services
            </legend>

            <p className="mt-1 text-sm text-gray-500">
              Select the plant care services you can provide.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {availableServices.map((service) => {
                const isSelected = services.includes(service.value);

                return (
                  <label
                    key={service.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      isSelected
                        ? "border-auplant-green bg-auplant-cream"
                        : "border-gray-200 bg-white hover:border-auplant-sage"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleServiceChange(service.value)}
                      className="h-4 w-4 accent-auplant-green"
                    />

                    <span className="font-medium text-auplant-dark">
                      {service.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Submit */}
          <div className="border-t border-auplant-sage pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-xl bg-auplant-green px-6 py-3 font-semibold text-white transition-colors hover:bg-auplant-dark disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isSubmitting ? "Creating profile..." : "Create Sitter Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BecomeSitter;
