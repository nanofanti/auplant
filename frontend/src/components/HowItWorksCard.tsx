type HowItWorksCardProps = {
  listNumber: number;
  title: string;
  subTitle: string;
  image: string;
};

function HowItWorksCard({
  listNumber,
  title,
  subTitle,
  image,
}: HowItWorksCardProps) {
  return (
    <div className="rounded-3xl bg-auplant-sage p-6 text-center">
      {/* Image */}
      <img
        src={image}
        alt=""
        className="h-80 w-full rounded-[3rem] object-cover"
      />

      {/* Step number */}
      <div className="mx-auto mt-10 flex h-16 w-16 items-center justify-center rounded-full bg-auplant-dark text-2xl font-bold text-auplant-cream">
        {listNumber}
      </div>

      {/* Title */}
      <h3 className="mt-4 text-3xl font-bold text-auplant-dark">{title}</h3>

      {/* Description */}
      <p className="mx-auto mt-3 max-w-xs text-lg leading-relaxed text-gray-600">
        {subTitle}
      </p>
    </div>
  );
}

export default HowItWorksCard;
