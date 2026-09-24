function PlantCareGuide() {
  const careTips = [
    {
      icon: "💧",
      title: "Watering",
      description:
        "Check the soil before watering. Many plants prefer the soil to dry slightly between waterings, while others need more consistent moisture.",
    },
    {
      icon: "☀️",
      title: "Light",
      description:
        "Keep plants in the location recommended by the owner. Avoid suddenly moving a plant from indirect light into strong direct sunlight.",
    },
    {
      icon: "💦",
      title: "Humidity",
      description:
        "Some tropical plants prefer higher humidity. Follow the owner's instructions before misting or changing the plant's environment.",
    },
    {
      icon: "🌱",
      title: "Fertilizing",
      description:
        "Only fertilize when instructed by the owner. Too much fertilizer can damage a plant, so avoid adding it as part of routine care unless requested.",
    },
    {
      icon: "✂️",
      title: "Pruning",
      description:
        "Remove damaged or dead leaves only when appropriate. Avoid major pruning unless the owner has specifically asked you to do it.",
    },
    {
      icon: "🐛",
      title: "Pests",
      description:
        "Look out for unusual spots, damaged leaves, insects, or other changes. If you notice something concerning, contact the owner before treating it.",
    },
  ];

  const sitterChecklist = [
    "Read the owner's care instructions carefully.",
    "Check the soil before watering.",
    "Keep plants in their usual location unless instructed otherwise.",
    "Check leaves and soil for unusual changes or pests.",
    "Contact the owner if you're unsure about something.",
    "Send the owner an update when appropriate.",
  ];

  return (
    <div className="bg-auplant-cream px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-auplant-green">
            AuPlant Guide
          </p>

          <h1 className="text-3xl font-bold text-auplant-dark sm:text-4xl">
            How to Take Care of Plants
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            A few simple guidelines to help plant sitters keep plants happy and
            healthy while their owners are away.
          </p>
        </div>

        {/* Important notice */}
        <div className="mb-10 rounded-2xl border border-auplant-olive bg-auplant-sage p-6">
          <h2 className="text-lg font-bold text-auplant-dark">
            🌿 Every plant is different
          </h2>

          <p className="mt-2 leading-7 text-auplant-dark">
            These tips are general guidelines. Always follow the plant owner's
            specific care instructions, as different plants can have very
            different needs.
          </p>
        </div>

        {/* Care tips */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-auplant-dark">
            Plant Care Basics
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {careTips.map((tip) => (
              <article
                key={tip.title}
                className="rounded-2xl border border-auplant-sage bg-white p-6 shadow-sm"
              >
                <div className="mb-4 text-3xl">{tip.icon}</div>

                <h3 className="text-lg font-bold text-auplant-dark">
                  {tip.title}
                </h3>

                <p className="mt-2 leading-7 text-gray-600">
                  {tip.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="mt-10 rounded-2xl border border-auplant-sage bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-auplant-dark">
            Plant Sitter Checklist
          </h2>

          <p className="mt-2 text-gray-600">
            Before and during a plant-sitting job, keep these basics in mind.
          </p>

          <div className="mt-6 space-y-3">
            {sitterChecklist.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-auplant-sage text-sm font-bold text-auplant-dark">
                  ✓
                </span>

                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom message */}
        <div className="mt-10 text-center">
          <h2 className="text-xl font-bold text-auplant-dark">
            When in doubt, ask the owner 🌱
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Good communication is one of the most important parts of plant
            sitting. If something looks unusual or you're unsure what to do,
            contact the plant owner before making major changes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlantCareGuide;
