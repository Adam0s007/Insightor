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
              Posts
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