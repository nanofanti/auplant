import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-auplant-sage bg-auplant-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-auplant-dark">
          AuPlant 🌱
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-6 text-sm">
          <Link
            to="/find-sitter"
            className="text-auplant-dark transition-colors hover:text-auplant-green"
          >
            Find a Sitter
          </Link>

          <Link
            to="/become-sitter"
            className="text-auplant-dark transition-colors hover:text-auplant-green"
          >
            Become a Sitter
          </Link>

          <Link
            to="/care-requests"
            className="text-auplant-dark transition-colors hover:text-auplant-green"
          >
            Care Requests
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} AuPlant
        </p>
      </div>
    </footer>
  );
}

export default Footer;
