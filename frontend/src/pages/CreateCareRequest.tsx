import { useState } from "react";
import type { CreateCareRequestData } from "../types/CareRequest";
import { createCareRequest } from "../services/careRequestService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CreateCareRequest() {
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [numberOfPlants, setNumberOfPlants] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [photos, setPhotos] = useState<string>("");
  const [offeredPrice, setOfferedPrice] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const careRequestData: CreateCareRequestData = {
      location,
      startDate,
      endDate,
      numberOfPlants,
      description,
      photos: photos
        .split(",")
        .map((photo) => photo.trim())
        .filter((photo) => photo !== ""),
      offeredPrice,
    };

    try {
      await createCareRequest(careRequestData);
      toast.success("Care request created successfully");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setNumberOfPlants(0);
      setDescription("");
      setPhotos("");
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

  return (
    <>
      <h1>Looking for a Plant Sitter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Start date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />
        <input
          type="date"
          placeholder="End date"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Number of plants"
          value={numberOfPlants}
          onChange={(event) => setNumberOfPlants(Number(event.target.value))}
          required
        />
        <textarea
          placeholder="Describe your plants and care instructions"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Photos (separated by commas)"
          value={photos}
          onChange={(event) => setPhotos(event.target.value)}
        />
        <input
          type="number"
          placeholder="Price offered"
          value={offeredPrice}
          onChange={(event) => setOfferedPrice(Number(event.target.value))}
          required
        />
        <button type="submit">Create Care Request</button>
      </form>
    </>
  );
}

export default CreateCareRequest;
