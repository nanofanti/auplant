import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { createCareRequest } from "../services/careRequestService";

function CreateCareRequest() {
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [numberOfPlants, setNumberOfPlants] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [offeredPrice, setOfferedPrice] = useState<number>(0);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("location", location);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("numberOfPlants", numberOfPlants.toString());
    formData.append("description", description);
    formData.append("offeredPrice", offeredPrice.toString());

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      await createCareRequest(formData);

      toast.success("Care request created successfully");

      setLocation("");
      setStartDate("");
      setEndDate("");
      setNumberOfPlants(0);
      setDescription("");
      setPhotos([]);
      setPhotoPreviews([]);
      setOfferedPrice(0);

      navigate("/care-requests");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create care request");
      }
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }

    photoPreviews.forEach((preview) => {
      URL.revokeObjectURL(preview);
    });

    setPhotos(selectedFiles);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setPhotoPreviews(previewUrls);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Looking for a Plant Sitter
      </h1>

      <p className="mt-2 text-gray-600">
        Create a request and let local plant sitters know what your plants need.
      </p>

      <form
        className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Location
          </label>

          <input
            id="location"
            type="text"
            placeholder="e.g. Heidelberg"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          />
        </div>

        {/* Dates */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Start date
            </label>

            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              End date
            </label>

            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>
        </div>

        {/* Number of plants */}
        <div>
          <label
            htmlFor="numberOfPlants"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Number of plants
          </label>

          <input
            id="numberOfPlants"
            type="number"
            min="1"
            placeholder="e.g. 5"
            value={numberOfPlants}
            onChange={(event) => setNumberOfPlants(Number(event.target.value))}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Care instructions
          </label>

          <textarea
            id="description"
            rows={5}
            placeholder="Describe your plants and what the sitter should know..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          />
        </div>

        {/* Photos */}
        <div>
          <label
            htmlFor="photos"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Photos
          </label>

          <input
            id="photos"
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            className="block w-full text-sm text-gray-700"
          />

          <p className="mt-2 text-xs text-gray-500">
            You can upload up to 5 images.
          </p>

          {photoPreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photoPreviews.map((preview, index) => (
                <img
                  key={preview}
                  src={preview}
                  alt={`Plant preview ${index + 1}`}
                  className="h-32 w-full rounded-xl object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Offered price */}
        <div>
          <label
            htmlFor="offeredPrice"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Offered price (€)
          </label>

          <input
            id="offeredPrice"
            type="number"
            min="0"
            placeholder="e.g. 40"
            value={offeredPrice}
            onChange={(event) => setOfferedPrice(Number(event.target.value))}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800"
        >
          Create Care Request
        </button>
      </form>
    </div>
  );
}

export default CreateCareRequest;
