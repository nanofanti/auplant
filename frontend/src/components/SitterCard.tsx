import type { PlantSitter } from "../types/PlantSitter";

type SitterCardProps = {
  name: string;
  sitter: PlantSitter;
};

function SitterCard({ name, sitter }: SitterCardProps) {
  return (
    <div className="my-4 mx-4 p-4 bg-green-700">
      <h2 className="text-2xl">{name}</h2>
      <div className="text-xl">{sitter.location}</div>
      <div>{sitter.bio}</div>
      <div>{sitter.experience}</div>
      <div>{sitter.pricePerDay}€</div>
      <div>{sitter.availability ? "Available" : "Not Available"}</div>
      <div>{sitter.services}</div>
    </div>
  );
}

export default SitterCard;
