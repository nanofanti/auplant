import { Link } from "react-router-dom";
import logo from "../assets/AuPlantLogoNew.png";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, logout, sitterProfile } = useAuth();

  return (
    <nav className="border-b border-auplant-sage bg-auplant-cream px-6 py-4">
      <ul className="flex items-center gap-6">
        {/* Logo */}
        <li className="mr-auto">
          <Link to="/">
            <img className="w-20" src={logo} alt="AuPlant" />
          </Link>
        </li>

        {/* Create Care Request */}
        {user?.roles.includes("owner") && (
          <li>
            <Link
              to="/create-care-request"
              className="rounded-lg bg-auplant-green px-4 py-2 font-medium text-white transition-colors hover:bg-auplant-dark"
            >
              Create Care Request
            </Link>
          </li>
        )}

        {/* Find Sitter */}
        <li className="py-4">
          <Link
            className="font-medium text-auplant-dark transition-colors hover:text-auplant-green"
            to="/find-sitter"
          >
            Find a Sitter
          </Link>
        </li>

        {/* Sitter Profile */}
        <li className="py-4">
          {sitterProfile ? (
            <Link
              className="font-medium text-auplant-dark transition-colors hover:text-auplant-green"
              to="/dashboard"
            >
              My Sitter Profile
            </Link>
          ) : (
            <Link
              className="font-medium text-auplant-dark transition-colors hover:text-auplant-green"
              to="/become-sitter"
            >
              Become a Sitter
            </Link>
          )}
        </li>

        {/* Care Requests */}
        <li>
          <Link
            className="font-medium text-auplant-dark transition-colors hover:text-auplant-green"
            to="/care-requests"
          >
            Care Requests
          </Link>
        </li>

        {/* Authentication */}
        <li>
          {user ? (
            <div className="flex items-center gap-3">
              <Link className="flex items-center gap-3" to="/dashboard">
                <span className="text-sm font-medium text-auplant-dark">
                  Hello {user.name}
                </span>

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={`${user.name}'s profile`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-auplant-sage text-sm font-semibold text-auplant-dark">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>

              <button
                type="button"
                className="cursor-pointer rounded-lg border border-auplant-green px-3 py-2 text-sm font-medium text-auplant-green transition-colors hover:bg-auplant-green hover:text-white"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-auplant-green px-4 py-2 font-medium text-white transition-colors hover:bg-auplant-dark"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
