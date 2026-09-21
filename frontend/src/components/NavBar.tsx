import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, logout, sitterProfile } = useAuth();

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4">
      <ul className="flex items-center gap-6">
        <li className="mr-auto">
          <Link to="/" className="text-xl font-bold text-green-700">
            <img className="w-30" src={"./src/assets/AuPlantLogo.png"} alt="" />
          </Link>
        </li>

        {user?.roles.includes("owner") && (
          <li>
            <Link
              to="/create-care-request"
              className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
            >
              Create Care Request
            </Link>
          </li>
        )}
        <li className="py-4">
          <Link className="font-medium hover:text-green-700" to="/find-sitter">
            Find a Sitter
          </Link>
        </li>
        <li className="py-4">
          {sitterProfile ? (
            <Link className="font-medium hover:text-green-700" to="/dashboard">
              My Sitter Profile
            </Link>
          ) : (
            <Link
              className="font-medium hover:text-green-700"
              to="/become-sitter"
            >
              Become a Sitter
            </Link>
          )}
        </li>
        <li>
          <Link
            className="font-medium hover:text-green-700"
            to="/care-requests"
          >
            Care Requests
          </Link>
        </li>
        <li>
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <span className="text-sm">Hello {user.name}</span>
              </Link>

              <button
                className="cursor-pointer rounded-lg border border-gray-300 bg-red-500 px-3 py-2 hover:bg-gray-100"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
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
