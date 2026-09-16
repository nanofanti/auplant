import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
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
