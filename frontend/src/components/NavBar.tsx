import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>{user && <p>Hello {user.name}</p>}</li>
        <li className="py-4">
          {user && (
            <button className="p-4 m-4 bg-red-400" onClick={logout}>
              Logout
            </button>
          )}
        </li>
        <li className="py-4">
          <Link className="p-4 m-4 bg-green-700" to="/find-sitter">
            Find a Sitter
          </Link>
        </li>
        <li className="py-4">
          <Link className="p-4 m-4 bg-green-700" to="/become-sitter">
            Become a Sitter
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
