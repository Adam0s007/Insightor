import { NavLink, Link } from "react-router-dom";
import classes from "./Header.module.css";
const Header = (props) => {
  return (
    <header className={classes.header}>
        <h1 className={classes.logo}>Logo</h1>
        <input type="checkbox" id="nav-toggle" className={classes["nav-toggle"]}/>
        <nav className={classes.nav}>
            <ul>
                <li><a className={classes.link} href="#">Home</a> </li>
                <li><a className={classes.link} href="#">About</a></li>
                <li><a className={classes.link} href="#">Blog</a></li>
                <li><a className={classes.link} href="#">Contact</a></li>
            </ul>
        </nav>
        <label htmlFor="nav-toggle" className={classes["nav-toggle-label"]}>
        <span></span>
        </label>
    </header>
  );
};

export default Header;
