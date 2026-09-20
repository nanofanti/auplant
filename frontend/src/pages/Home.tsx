import { Link } from "react-router-dom";
import HowItWorksCard from "../components/HowItWorksCard";

const howItWorks = [
  {
    listNumber: 1,
    title: "FIND",
    subTitle: "Find a plant sitter near you!",
  },
  {
    listNumber: 2,
    title: "CONNECT",
    subTitle: "Choose someone who fits your needs",
  },
  {
    listNumber: 3,
    title: "RELAX",
    subTitle: "Enjoy your trip knowing your plants are cared for",
  },
];

function Home() {
  return (
    <>
      <section>
        <h1 className="text-5xl font-bold text-green-700">
          Find someone who cares for your plants as much as you do.
        </h1>
        <p>
          Connect with plant lovers near you and find the right person to look
          after your plants while you're away.
        </p>
        <div className="p-4">
          <Link className="p-4 m-4 bg-green-700" to="/find-sitter">
            Find a Sitter
          </Link>
          <Link className="p-4 m-4 bg-green-700" to="/become-sitter">
            Become a Sitter
          </Link>
        </div>
      </section>
      <section className="p-4">
        <h2 className="text-3xl">How It Works</h2>
        <div>
          {howItWorks.map((homeCard) => (
            <HowItWorksCard
              key={homeCard.listNumber}
              listNumber={homeCard.listNumber}
              title={homeCard.title}
              subTitle={homeCard.subTitle}
            />
          ))}
        </div>
      </section>
      <section>
        <h2>Ready to join the AuPlant community?</h2>
        <p>
          Whether you're looking for someone to care for your plants or you'd
          like to help other plant owners, AuPlant connects you.
        </p>
        <div className="p-4">
          <Link className="p-4 m-4 bg-green-700" to="/find-sitter">
            Find a Sitter
          </Link>
          <Link className="p-4 m-4 bg-green-700" to="/become-sitter">
            Become a Sitter
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
