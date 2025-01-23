/** @format */

import { Link } from "react-router-dom";
import classes from "./styles.module.css";
import Box from "@mui/material/Box";

const Layout = () => {
  return (
    <div className={classes.layoutContainer}>
      <nav>
        <li>
          <Link to="/all_recipes">All recipes</Link>
        </li>
        <li>
          <Link to="/selected">Selected recipes</Link>
        </li>
      </nav>
    </div>
  );
};

export default Layout;
