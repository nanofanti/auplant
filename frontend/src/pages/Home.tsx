import { Link } from "react-router-dom";

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
        <div>
          <Link to="/find-sitter">Find a Sitter</Link>
          <Link to="/become-sitter">Become a Sitter</Link>
        </div>
      </section>
      <section>
        <h2 className="text-3xl">How It Works</h2>
        <div>
          <div>
            <h3>1. FIND</h3>
            <p>Find a plant sitter near you</p>
          </div>
          <div>
            <h3>2. CONNECT</h3>
            <p>Choose someone who fits your needs</p>
          </div>
          <div>
            <h3>3. RELAX</h3>
            <p>Enjoy your trip knowing your plants are cared for</p>
          </div>
        </div>
      </section>
      <section>
        <h2>Ready to join the AuPlant community?</h2>
        <p>
          Whether you're looking for someone to care for your plants or you'd
          like to help other plant owners, AuPlant connects you.
        </p>
        <Link to="/find-sitter">Find a Sitter</Link>
        <Link to="/become-sitter">Become a Sitter</Link>
      </section>
    </>
  );
}

export default Home;
