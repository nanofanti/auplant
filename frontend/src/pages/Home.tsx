import { Link } from "react-router-dom";
import findImage from "../assets/how-it-works/find-sitter.png";
import connectImage from "../assets/how-it-works/connect-sitter.png";
import relaxImage from "../assets/how-it-works/relax-plants.png";
import HowItWorksCard from "../components/HowItWorksCard";
import heroImage from "../assets/hero/hero-plant-sitter.png";

const howItWorks = [
  {
    listNumber: 1,
    title: "FIND",
    subTitle: "Find a plant sitter near you!",
    image: findImage,
  },
  {
    listNumber: 2,
    title: "CONNECT",
    subTitle: "Choose someone who fits your needs",
    image: connectImage,
  },
  {
    listNumber: 3,
    title: "RELAX",
    subTitle: "Enjoy your trip knowing your plants are cared for",
    image: relaxImage,
  },
];

function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="overflow-hidden bg-auplant-cream">
        <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          {/* Hero text */}
          <div className="max-w-3xl">
            <p className="mb-4 font-semibold uppercase tracking-wider text-auplant-olive">
              Plant care made simple
            </p>

            <h1 className="text-4xl font-bold leading-tight text-auplant-dark sm:text-5xl lg:text-6xl">
              Find someone who cares for your plants as much as you do.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700">
              Connect with plant lovers near you and find the right person to
              look after your plants while you're away.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="rounded-lg bg-auplant-green px-6 py-3 font-semibold text-white transition-colors hover:bg-auplant-dark"
                to="/find-sitter"
              >
                Find a Sitter
              </Link>

              <Link
                className="rounded-lg border border-auplant-green px-6 py-3 font-semibold text-auplant-green transition-colors hover:bg-auplant-sage"
                to="/become-sitter"
              >
                Become a Sitter
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="flex items-center justify-center lg:justify-end">
            <img
              src={heroImage}
              alt="Plant sitter caring for a houseplant"
              className="w-full max-w-2xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        {/* Text stays aligned with the rest of the site */}
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-semibold uppercase tracking-wider text-auplant-olive">
            Simple & easy
          </p>

          <h2 className="mt-2 text-3xl font-bold text-auplant-dark">
            How It Works
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            Finding someone you trust to care for your plants only takes a few
            steps.
          </p>
        </div>

        {/* Cards use almost the entire screen */}
        <div className="mx-auto mt-10 w-full max-w-[1600px] px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((homeCard) => (
              <HowItWorksCard
                key={homeCard.listNumber}
                listNumber={homeCard.listNumber}
                title={homeCard.title}
                subTitle={homeCard.subTitle}
                image={homeCard.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}

      <section className="bg-auplant-sage px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 font-semibold text-auplant-green">
            New to AuPlant?
          </p>

          <h2 className="text-3xl font-bold text-auplant-dark">
            Not sure where to start?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Learn how AuPlant works, whether you're looking for someone to care
            for your plants or you'd like to become a plant sitter yourself.
          </p>

          <Link
            to="/instructions"
            className="mt-8 inline-block rounded-xl bg-auplant-green px-6 py-3 font-semibold text-white transition hover:bg-auplant-dark"
          >
            How AuPlant Works →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-auplant-dark">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-auplant-cream sm:text-4xl">
            Ready to join the AuPlant community?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-auplant-sage">
            Whether you're looking for someone to care for your plants or you'd
            like to help other plant owners, AuPlant connects you.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="rounded-lg bg-auplant-cream px-6 py-3 font-semibold text-auplant-dark transition-colors hover:bg-auplant-sage"
              to="/find-sitter"
            >
              Find a Sitter
            </Link>

            <Link
              className="rounded-lg border border-auplant-sage px-6 py-3 font-semibold text-auplant-cream transition-colors hover:bg-auplant-green"
              to="/become-sitter"
            >
              Become a Sitter
            </Link>
          </div>
        </div>
      </section>
      {/* Plant Care Guide */}
      <section className="bg-auplant-cream px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          {/* Text */}
          <div>
            <p className="mb-2 font-semibold uppercase tracking-wider text-auplant-olive">
              Plant Care
            </p>

            <h2 className="text-3xl font-bold text-auplant-dark">
              Give every plant the care it deserves
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-gray-600">
              From watering and light to pruning and pest checks, discover some
              simple guidelines that can help you take better care of plants
              while their owner is away.
            </p>

            <Link
              to="/plant-care-guide"
              className="mt-6 inline-block rounded-xl bg-auplant-green px-6 py-3 font-semibold text-white transition-colors hover:bg-auplant-dark"
            >
              Explore the Plant Care Guide →
            </Link>
          </div>

          {/* Care categories */}
          <div className="rounded-2xl border border-auplant-sage bg-white p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-auplant-cream p-5 text-center">
                <div className="text-3xl">💧</div>
                <p className="mt-2 font-semibold text-auplant-dark">Watering</p>
              </div>

              <div className="rounded-xl bg-auplant-cream p-5 text-center">
                <div className="text-3xl">☀️</div>
                <p className="mt-2 font-semibold text-auplant-dark">Light</p>
              </div>

              <div className="rounded-xl bg-auplant-cream p-5 text-center">
                <div className="text-3xl">🌱</div>
                <p className="mt-2 font-semibold text-auplant-dark">Feeding</p>
              </div>

              <div className="rounded-xl bg-auplant-cream p-5 text-center">
                <div className="text-3xl">✂️</div>
                <p className="mt-2 font-semibold text-auplant-dark">Pruning</p>
              </div>

              <div className="rounded-xl bg-auplant-cream p-5 text-center">
                <div className="text-3xl">💦</div>
                <p className="mt-2 font-semibold text-auplant-dark">Humidity</p>
              </div>

              <div className="rounded-xl bg-auplant-cream p-5 text-center">
                <div className="text-3xl">🐛</div>
                <p className="mt-2 font-semibold text-auplant-dark">Pests</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-auplant-sage p-8 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-3xl">
                <p className="mb-2 font-semibold uppercase tracking-wider text-auplant-olive">
                  Before you connect
                </p>

                <h2 className="text-2xl font-bold text-auplant-dark sm:text-3xl">
                  Clear agreements make plant sitting easier
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  AuPlant helps owners and sitters find and contact each other.
                  Payments and plant-sitting arrangements are agreed directly
                  between users, so make sure expectations are clear before
                  getting started.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  to="/disclaimer"
                  className="inline-block rounded-xl border border-auplant-green px-6 py-3 font-semibold text-auplant-green transition-colors hover:bg-auplant-green hover:text-white"
                >
                  Read Disclaimer →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
