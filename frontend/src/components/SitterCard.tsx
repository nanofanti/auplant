import type { PlantSitter } from "../types/PlantSitter";

type SitterCardProps = {
  sitter: PlantSitter;
};

function SitterCard({ sitter }: SitterCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 m-2 shadow-sm transition-shadow hover:shadow-md">
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
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-800">
              {sitter.userId.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {sitter.userId.name}
            </h2>

            <p className="text-sm text-gray-500">{sitter.location}</p>
          </div>
        </div>

        {/* Availability */}
        <span
          className={
            sitter.availability
              ? "rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
              : "rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600"
          }
        >
          {sitter.availability ? "Available" : "Not available"}
        </span>
      </div>

      {/* Bio */}
      <p className="mt-5 text-gray-700">{sitter.bio}</p>

      {/* Experience */}
      <div className="mt-5">
        <p className="text-sm font-medium text-gray-500">Experience</p>
        <p className="mt-1 text-gray-800">{sitter.experience}</p>
      </div>

      {/* Services */}
      <div className="mt-5">
        <p className="text-sm font-medium text-gray-500">Services</p>

        <div className="mt-2 flex flex-wrap gap-2">
          {sitter.services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <span className="text-2xl font-bold text-green-700">
          {sitter.pricePerDay} €
        </span>
        <span className="ml-1 text-sm text-gray-500">/ day</span>
      </div>
    </div>
  );
}

export default SitterCard;
