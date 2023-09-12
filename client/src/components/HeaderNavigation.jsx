import { NavLink, useRouteLoaderData,Form } from "react-router-dom";
import { Fragment } from "react";

import Logo from "../ui/Logo";

import classes from "./HeaderNavigation.module.css";
const HeaderNavigation = (props) => {
  const token = useRouteLoaderData("root");
 
  return (
    <Fragment>
      <input
        type="checkbox"
        id="nav-toggle"
        className={classes["nav-toggle"]}
      />
      <header className={classes.header}>
        <h1 className={classes.logo}>
          <Logo />
        </h1>

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
                to="my-profile"
                className={({ isActive }) =>
                  (isActive = isActive
                    ? `${classes.link}  ${classes.active}`
                    : `${classes.link}`)
                }

              >
                My Profile
              </NavLink>
            </li>
            {!token && (
              <li>
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) =>
                    (isActive = isActive
                      ? `${classes.link}  ${classes.active}`
                      : `${classes.link}`)
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <Form action="/logout" method="post">
                  <button className={classes.link}>Logout</button>
                </Form>
              </li>
            )}
          </ul>
        </nav>
        <label htmlFor="nav-toggle" className={classes["nav-toggle-label"]}>
          <span></span>
        </label>
      </header>
    </Fragment>
  );
};

export default HeaderNavigation;
