import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>{user && <p>Hello {user.name}</p>}</li>
        <li>
          <Link to="/find-sitter">Find a Sitter</Link>
        </li>
        <li>
          <Link to="/become-sitter">Become a Sitter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
