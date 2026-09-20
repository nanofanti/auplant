import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getCareRequestById,
  updateCareRequest,
} from "../services/careRequestService";
import type { UpdateCareRequestData } from "../types/CareRequest";
import { toast } from "sonner";

function EditCareRequest() {
  const { id } = useParams();
  const [formData, setFormData] = useState<UpdateCareRequestData>({
    location: "",
    startDate: "",
    endDate: "",
    numberOfPlants: 0,
    description: "",
    photos: [],
    offeredPrice: 0,
  });
  const navigate = useNavigate();

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
          photos: response.data.photos,
          offeredPrice: response.data.offeredPrice,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadCareRequest();
  }, [id]);

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
      await updateCareRequest(id, formData);

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
