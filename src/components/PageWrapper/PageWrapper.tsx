/** @format */

import { ReactNode } from "react";
import classes from "./styles.module.css";
import Layout from "../Layout/Layout";
type Props = {
  children: ReactNode;
};
const PageWrapper = ({ children }: Props) => {
  return (
    <div className={classes.wrapperContainer}>
      <div className={classes.leftSide}>
        <Layout />
      </div>
      <div className={classes.rightSide}>{children}</div>
    </div>
  );
};

export default PageWrapper;
