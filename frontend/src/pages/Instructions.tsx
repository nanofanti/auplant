import {
  UserPlus,
  ClipboardPlus,
  Images,
  Search,
  MessageCircle,
  Palmtree,
  Sprout,
  Settings,
  MapPin,
  Handshake,
  Heart,
  ArrowDown,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import instructionBanner from "../assets/banners/instructions-banner.png";
import { Link } from "react-router-dom";

function Instructions() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-auplant-cream">
      {/* Header */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 font-semibold uppercase tracking-wider text-auplant-green">
            Getting started
          </p>

          <h1 className="text-4xl font-bold text-auplant-dark md:text-5xl">
            How AuPlant Works
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Whether you're looking for someone to take care of your plants or
            you'd like to help other plant owners, getting started is simple.
          </p>
        </div>
      </section>

      {/* Banner */}
      <section
        className="relative flex min-h-[600px] items-center bg-cover bg-center px-6 py-16"
        style={{
          backgroundImage: `url(${instructionBanner})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="max-w-xl rounded-3xl bg-auplant-cream/90 p-8 backdrop-blur-sm md:p-10">
            <p className="font-semibold uppercase tracking-wider text-auplant-green">
              Plants bring people together
            </p>

            <h2 className="mt-3 text-3xl font-bold text-auplant-dark md:text-4xl">
              Find the right way to use AuPlant
            </h2>

            <p className="mt-4 leading-relaxed text-gray-700">
              Whether your plants need someone while you're away or you'd like
              to help other plant lovers, AuPlant connects people who care.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("find-sitter")}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-auplant-green bg-white px-6 py-3 font-semibold text-auplant-dark transition hover:bg-auplant-sage"
              >
                Find a sitter
                <ArrowDown size={18} />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("become-sitter")}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-auplant-green px-6 py-3 font-semibold text-white transition hover:bg-auplant-dark"
              >
                Become a sitter
                <ArrowDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plant owner */}
      <section id="find-sitter" className="scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="font-semibold uppercase tracking-wider text-auplant-green">
              For plant owners
            </p>

            <h2 className="mt-2 text-3xl font-bold text-auplant-dark">
              🌿 I need a plant sitter
            </h2>

            <p className="mt-3 max-w-2xl text-gray-700">
              Going away? Create a care request and find someone who can look
              after your plants while you're gone.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InstructionCard
              number="01"
              icon={UserPlus}
              title="Create your account"
              description="Create your AuPlant account to start looking for plant sitters."
            />

            <InstructionCard
              number="02"
              icon={ClipboardPlus}
              title="Create a care request"
              description="Tell sitters where you are, when you need help and how many plants need care."
            />

            <InstructionCard
              number="03"
              icon={Images}
              title="Add your plants"
              description="Add photos and instructions so sitters know exactly what your plants need."
            />

            <InstructionCard
              number="04"
              icon={Search}
              title="Find a sitter"
              description="Discover plant sitters and find someone who fits your needs."
            />

            <InstructionCard
              number="05"
              icon={MessageCircle}
              title="Get in touch"
              description="Contact the sitter and discuss the details of your plant care."
            />

            <InstructionCard
              number="06"
              icon={Palmtree}
              title="Enjoy your time away"
              description="Leave knowing your plants are in good hands."
            />
          </div>
        </div>
      </section>

      {/* Plant sitter */}
      <section
        id="become-sitter"
        className="scroll-mt-20 bg-auplant-sage px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="font-semibold uppercase tracking-wider text-auplant-green">
              For plant sitters
            </p>

            <h2 className="mt-2 text-3xl font-bold text-auplant-dark">
              🪴 I want to become a plant sitter
            </h2>

            <p className="mt-3 max-w-2xl text-gray-700">
              Help people in your area take care of their plants while they're
              away.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InstructionCard
              number="01"
              icon={UserPlus}
              title="Create your account"
              description="Join AuPlant and create your personal account."
            />

            <InstructionCard
              number="02"
              icon={Sprout}
              title="Become a sitter"
              description="Create your sitter profile and tell plant owners about yourself."
            />

            <InstructionCard
              number="03"
              icon={Settings}
              title="Set your details"
              description="Add your location, experience, availability, services and daily price."
            />

            <InstructionCard
              number="04"
              icon={MapPin}
              title="Browse care requests"
              description="See plant owners who are looking for help."
            />

            <InstructionCard
              number="05"
              icon={Handshake}
              title="Connect"
              description="Get in touch with plant owners and discuss their plants and care requirements."
            />

            <InstructionCard
              number="06"
              icon={Heart}
              title="Start plant sitting"
              description="Help keep someone's plants happy and healthy while they're away."
            />
          </div>
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
    </main>
  );
}

type InstructionCardProps = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

function InstructionCard({
  number,
  title,
  description,
  icon: Icon,
}: InstructionCardProps) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-auplant-sage">
          <Icon size={24} strokeWidth={1.8} className="text-auplant-dark" />
        </div>

        <span className="text-sm font-bold text-auplant-olive">{number}</span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-auplant-dark">{title}</h3>

      <p className="mt-3 leading-relaxed text-gray-700">{description}</p>
    </article>
  );
}

export default Instructions;
