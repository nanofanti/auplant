import type { PlantSitter } from "../types/PlantSitter";

type SitterCardProps = {
  sitter: PlantSitter;
};

function SitterCard({ sitter }: SitterCardProps) {
  return (
    <div className="my-4 mx-4 p-4 bg-green-700">
      <div className="flex items-center gap-3">
        {sitter.userId.profileImage ? (
          <img
            src={sitter.userId.profileImage}
            alt={`${sitter.userId.name}'s profile`}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-800">
            {sitter.userId.name.charAt(0).toUpperCase()}
          </div>
        )}
        <h2 className="text-2xl">{sitter.userId.name}</h2>
      </div>
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
