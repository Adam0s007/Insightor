import { NavLink, } from "react-router-dom";
import { Fragment } from "react";

import Logo from "../ui/Logo";

import classes from "./HeaderNavigation.module.css";
const HeaderNavigation = (props) => {

  return (
    <Fragment>
    <input
    type="checkbox"
    id="nav-toggle"
    className={classes["nav-toggle"]}
  />
   <header className={classes.header}>
      <h1 className={classes.logo}><Logo/></h1>
      
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
              to="articles"
              className={({ isActive }) =>
                (isActive = isActive
                  ? `${classes.link}  ${classes.active}`
                  : `${classes.link}`)
              }
            >
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="contact"
              className={({ isActive }) =>
                (isActive = isActive
                  ? `${classes.link}  ${classes.active}`
                  : `${classes.link}`)
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                (isActive = isActive
                  ? `${classes.link}  ${classes.active}`
                  : `${classes.link}`)
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className={classes["nav-toggle-label"]} >
        <span></span>
      </label>
    </header>
    </Fragment>
  );
};

export default HeaderNavigation;
