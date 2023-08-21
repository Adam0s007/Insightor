import { NavLink, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
const Header = (props) => {
  return (
    <header>
      <Link to="/" end>
        MyBlog
      </Link>
      <nav>
        <NavLink
          to="/login"
          className={({ isActive }) => 
            isActive ? classes.active : undefined
          }
          end
        >
          Login
        </NavLink>
        <NavLink
          className={({ isActive }) => 
            isActive ? classes.active : undefined
          }
          to="/register"
          end
        >
          Register
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;