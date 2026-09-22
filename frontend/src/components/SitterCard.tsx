import type { PlantSitter } from "../types/PlantSitter";

type SitterCardProps = {
  sitter: PlantSitter;
};

function SitterCard({ sitter }: SitterCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-auplant-sage p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Sitter header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {sitter.userId.profileImage ? (
            <img
              src={sitter.userId.profileImage}
              alt={`${sitter.userId.name}'s profile`}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-auplant-cream text-lg font-semibold text-auplant-dark">
              {sitter.userId.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-auplant-dark">
              {sitter.userId.name}
            </h2>

            <p className="text-sm text-gray-600">{sitter.location}</p>
          </div>
        </div>

        {/* Availability */}
        <span
          className={
            sitter.availability
              ? "rounded-full bg-auplant-green px-3 py-1 text-sm font-medium text-white"
              : "rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600"
          }
        >
          {sitter.availability ? "Available" : "Not available"}
        </span>
      </div>

      {/* Bio */}
      <p className="mt-5 text-auplant-text-black">{sitter.bio}</p>

      {/* Experience */}
      <div className="mt-5">
        <p className="text-sm font-semibold text-auplant-green">Experience</p>

        <p className="mt-1 text-auplant-text-black">{sitter.experience}</p>
      </div>

      {/* Services */}
      <div className="mt-5">
        <p className="text-sm font-semibold text-auplant-green">Services</p>

        <div className="mt-2 flex flex-wrap gap-2">
          {sitter.services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-auplant-cream px-3 py-1 text-sm text-auplant-green"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mt-6 border-t border-auplant-olive pt-4">
        <span className="text-2xl font-bold text-auplant-green">
          {sitter.pricePerDay} €
        </span>

        <span className="ml-1 text-sm text-gray-600">/ day</span>
      </div>
    </div>
  );
}

export default SitterCard;
