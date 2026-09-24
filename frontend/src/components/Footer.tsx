import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-auplant-dark text-auplant-cream">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-bold">
              AuPlant 🌱
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-auplant-sage">
              Connecting plant owners with plant lovers who can care for their
              plants while they're away.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h2 className="font-semibold text-white">Explore</h2>

            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-auplant-sage">
              <Link
                to="/find-sitter"
                className="transition-colors hover:text-white"
              >
                Find a Sitter
              </Link>

              <Link
                to="/care-requests"
                className="transition-colors hover:text-white"
              >
                Care Requests
              </Link>

              <Link
                to="/become-sitter"
                className="transition-colors hover:text-white"
              >
                Become a Sitter
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h2 className="font-semibold text-white">Resources</h2>

            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-auplant-sage">
              <Link
                to="/instructions"
                className="transition-colors hover:text-white"
              >
                How AuPlant Works
              </Link>

              <Link
                to="/plant-care-guide"
                className="transition-colors hover:text-white"
              >
                Plant Care Guide
              </Link>

              <Link
                to="/disclaimer"
                className="transition-colors hover:text-white"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-auplant-green pt-6">
          <p className="text-sm text-auplant-sage">
            © {new Date().getFullYear()} AuPlant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
