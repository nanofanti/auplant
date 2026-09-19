import { useState } from "react";
import type { CreateSitterData } from "../types/PlantSitter";
import { createSitter } from "../services/sitterService";
import { useNavigate } from "react-router-dom";

function BecomeSitter() {
  const [location, setLocation] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [pricePerDay, setPricePerDay] = useState<number>(0);
  const [availability, setAvailability] = useState<boolean>(true);
  const [services, setServices] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const sitterData: CreateSitterData = {
      location,
      bio,
      experience,
      pricePerDay,
      availability,
      services: services.split(",").map((service) => service.trim()),
    };

    try {
      const response = await createSitter(sitterData);
      setSuccessMessage(response.message);
      setLocation("");
      setBio("");
      setExperience("");
      setPricePerDay(0);
      setAvailability(true);
      setServices("");
      console.log(response);

      setTimeout(() => {
        navigate("/find-sitter");
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to create a sitter profile");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
        <textarea
          placeholder="Describe your plant care experience"
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
        />
        <input
          type="number"
          placeholder="Price per day"
          value={pricePerDay}
          onChange={(event) => setPricePerDay(Number(event.target.value))}
        />
        <label>
          Available
          <input
            type="checkbox"
            checked={availability}
            onChange={(event) => {
              setAvailability(event.target.checked);
            }}
          />
        </label>
        <input
          type="text"
          placeholder="Services (separated by commas)"
          value={services}
          onChange={(event) => setServices(event.target.value)}
        />
        <button type="submit">Create Sitter Profile</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default BecomeSitter;
