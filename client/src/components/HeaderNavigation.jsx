import { NavLink, useRouteLoaderData,Form } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { Fragment } from "react";
import { FaHome, FaNewspaper, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import Logo from "../ui/Logo";

import classes from "./HeaderNavigation.module.css";
const HeaderNavigation = (props) => {
  let token = useRouteLoaderData("root");
  token = token === "EXPIRED" ? null : token;
  let email = decodeToken(token)?.email;

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
                <FaHome/> Home
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
              <FaNewspaper/>  Articles
              </NavLink>
            </li>
           {token && <li>
              <NavLink
                to="my-profile"
                className={({ isActive }) =>
                  (isActive = isActive
                    ? `${classes.link}  ${classes.active}`
                    : `${classes.link}`)
                }

              >
                 <FaUser/> {email ?? "My Profile"}
              </NavLink>
            </li>}
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
                 <FaSignInAlt/> Login
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <Form action="/logout" method="post">
                  <button className={classes.link}><FaSignOutAlt/>Logout</button>
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
