import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  getCareRequestById,
  updateCareRequest,
} from "../services/careRequestService";

import type {
  CareRequestPhoto,
  UpdateCareRequestData,
} from "../types/CareRequest";

function EditCareRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UpdateCareRequestData>({
    location: "",
    startDate: "",
    endDate: "",
    numberOfPlants: 0,
    description: "",
    offeredPrice: 0,
  });

  const [existingPhotos, setExistingPhotos] = useState<CareRequestPhoto[]>([]);

  const [removedPhotos, setRemovedPhotos] = useState<CareRequestPhoto[]>([]);

  const [newPhotos, setNewPhotos] = useState<File[]>([]);

  const [newPhotoPreviews, setNewPhotoPreviews] = useState<string[]>([]);

  const newPhotoPreviewsRef = useRef<string[]>([]);

  // Load Care Request
  useEffect(() => {
    if (!id) {
      return;
    }

    const loadCareRequest = async () => {
      try {
        const response = await getCareRequestById(id);

        setFormData({
          location: response.data.location,
          startDate: response.data.startDate.slice(0, 10),
          endDate: response.data.endDate.slice(0, 10),
          numberOfPlants: response.data.numberOfPlants,
          description: response.data.description,
          offeredPrice: response.data.offeredPrice,
        });

        setExistingPhotos(response.data.photos);
      } catch (error) {
        console.error(error);
      }
    };

    loadCareRequest();
  }, [id]);

  // Clean up temporary preview URLs when component unmounts
  useEffect(() => {
    return () => {
      newPhotoPreviewsRef.current.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      return;
    }

    try {
      const updateData = new FormData();

      if (formData.location !== undefined) {
        updateData.append("location", formData.location);
      }

      if (formData.startDate !== undefined) {
        updateData.append("startDate", formData.startDate);
      }

      if (formData.endDate !== undefined) {
        updateData.append("endDate", formData.endDate);
      }

      if (formData.numberOfPlants !== undefined) {
        updateData.append("numberOfPlants", formData.numberOfPlants.toString());
      }

      if (formData.description !== undefined) {
        updateData.append("description", formData.description);
      }

      if (formData.offeredPrice !== undefined) {
        updateData.append("offeredPrice", formData.offeredPrice.toString());
      }

      updateData.append(
        "removedPhotoPublicIds",
        JSON.stringify(removedPhotos.map((photo) => photo.publicId)),
      );

      newPhotos.forEach((photo) => {
        updateData.append("photos", photo);
      });

      await updateCareRequest(id, updateData);

      toast.success("Care request updated successfully");

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update care request");
      }
    }
  };

  const handleRemoveExistingPhoto = (publicId: string) => {
    const photoToRemove = existingPhotos.find(
      (photo) => photo.publicId === publicId,
    );

    if (!photoToRemove) {
      return;
    }

    setExistingPhotos((currentPhotos) =>
      currentPhotos.filter((photo) => photo.publicId !== publicId),
    );

    setRemovedPhotos((currentPhotos) => [...currentPhotos, photoToRemove]);
  };

  const handleNewPhotosChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    const invalidType = selectedFiles.find(
      (file) => !file.type.startsWith("image/"),
    );

    if (invalidType) {
      toast.error("Only image files are allowed");
      event.target.value = "";
      return;
    }

    const maxFileSize = 5 * 1024 * 1024;

    const oversizedFile = selectedFiles.find((file) => file.size > maxFileSize);

    if (oversizedFile) {
      toast.error("Each image must be smaller than 5 MB");
      event.target.value = "";
      return;
    }

    const totalPhotos =
      existingPhotos.length + newPhotos.length + selectedFiles.length;

    if (totalPhotos > 5) {
      toast.error("You can have a maximum of 5 photos");
      event.target.value = "";
      return;
    }

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setNewPhotos((currentPhotos) => [...currentPhotos, ...selectedFiles]);

    setNewPhotoPreviews((currentPreviews) => [
      ...currentPreviews,
      ...previewUrls,
    ]);

    newPhotoPreviewsRef.current = [
      ...newPhotoPreviewsRef.current,
      ...previewUrls,
    ];

    // Allows selecting the same file again later
    event.target.value = "";
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Edit Care Request</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="location" className="mb-2 block font-medium">
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="startDate" className="mb-2 block font-medium">
            Start Date
          </label>

          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="mb-2 block font-medium">
            End Date
          </label>

          <input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="numberOfPlants" className="mb-2 block font-medium">
            Number of Plants
          </label>

          <input
            id="numberOfPlants"
            name="numberOfPlants"
            type="number"
            min="1"
            value={formData.numberOfPlants}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="offeredPrice" className="mb-2 block font-medium">
            Offered Price (€)
          </label>

          <input
            id="offeredPrice"
            name="offeredPrice"
            type="number"
            min="0"
            value={formData.offeredPrice}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        {/* Existing photos */}
        {existingPhotos.length > 0 && (
          <div>
            <p className="mb-2 font-medium">Current photos</p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {existingPhotos.map((photo, index) => (
                <div key={photo.publicId} className="relative">
                  <img
                    src={photo.url}
                    alt={`Plant ${index + 1}`}
                    className="h-32 w-full rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveExistingPhoto(photo.publicId)}
                    className="absolute right-2 top-2 cursor-pointer rounded-lg bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add new photos */}
        <div>
          <label htmlFor="newPhotos" className="mb-2 block font-medium">
            Add new photos
          </label>

          <input
            id="newPhotos"
            type="file"
            accept="image/*"
            multiple
            onChange={handleNewPhotosChange}
            className="block w-full text-sm text-gray-700"
          />

          <p className="mt-2 text-sm text-gray-500">
            Maximum 5 photos. Maximum 5 MB per image.
          </p>
        </div>

        {/* New photo previews */}
        {newPhotoPreviews.length > 0 && (
          <div>
            <p className="mb-2 font-medium">New photos</p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {newPhotoPreviews.map((preview, index) => (
                <img
                  key={preview}
                  src={preview}
                  alt={`New plant preview ${index + 1}`}
                  className="h-32 w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}

export default EditCareRequest;
