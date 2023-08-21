import { NavLink, Link } from "react-router-dom";
import classes from "./Header.module.css";
const Header = (props) => {
  return (
    <header>
      <Link to="/" end>
        MyBlog
      </Link>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          Login
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          to="/"
          end
        >
          Register
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
