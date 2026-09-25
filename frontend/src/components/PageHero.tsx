type PageHeroProps = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
};

function PageHero({ image, eyebrow, title, description }: PageHeroProps) {
  return (
    <section
      className="relative flex min-h-[600px] items-center bg-cover bg-center px-6 py-16"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Header */}
      <section className="relative z-10 w-full px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 font-semibold uppercase tracking-wider text-auplant-cream text-sm">
            {eyebrow}
          </p>

          <h1 className="text-6xl font-bold text-auplant-green md:text-8xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-2xl text-white/90">{description}</p>
        </div>
      </section>
    </section>
  );
}

export default PageHero;
