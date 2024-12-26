/** @format */

import { Link } from "react-router-dom";
import classes from "./styles.module.css";

const Layout = () => {
  return (
    <div className={classes.layoutContainer}>
      <nav>
        <li>
          <Link to="/all_recipes">All recipes</Link>
        </li>
        <li>
          <Link to="/favorite">Favorite recipes</Link>
        </li>
      </nav>
    </div>
  );
};

export default Layout;
