import type { PlantSitter } from "../types/PlantSitter";

type SitterCardProps = {
  name: string;
  sitter: PlantSitter;
};

function SitterCard({ name, sitter }: SitterCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <div>{sitter.location}</div>
      <div>{sitter.bio}</div>
      <div>{sitter.experience}</div>
      <div>{sitter.pricePerDay}€</div>
      <div>{sitter.availability ? "Available" : "Not Available"}</div>
      <div>{sitter.services}</div>
    </div>
  );
}

export default SitterCard;
