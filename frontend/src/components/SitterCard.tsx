import type { PlantSitter } from "../types/PlantSitter";

type SitterCardProps = {
  name: string;
  sitter: PlantSitter;
};

function SitterCard({ name, sitter }: SitterCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <div>{sitter.city}</div>
      <div>
        {sitter.experience}
        {sitter.experience === 1
          ? " year of experience"
          : " years of experience"}
      </div>
      <div>{sitter.pricePerDay}€</div>
      <div>{sitter.available ? "Available" : "Not Available"}</div>
    </div>
  );
}

export default SitterCard;
