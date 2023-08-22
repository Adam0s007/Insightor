import { NavLink, Link } from "react-router-dom";
import classes from "./Header.module.css";
const Header = (props) => {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>Logo</h1>
      <input
        type="checkbox"
        id="nav-toggle"
        className={classes["nav-toggle"]}
      />
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                (isActive = isActive
                  ? `${classes.link}  ${classes.active}`
                  : `${classes.link}`)
              }
            >
              Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                (isActive = isActive
                  ? `${classes.link}  ${classes.active}`
                  : `${classes.link}`)
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="posts"
              className={({ isActive }) =>
                (isActive = isActive
                  ? `${classes.link}  ${classes.active}`
                  : `${classes.link}`)
              }
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                (isActive = isActive
                  ? `${classes.link}  ${classes.active}`
                  : `${classes.link}`)
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className={classes["nav-toggle-label"]}>
        <span></span>
      </label>
    </header>
  );
};

export default Header;
