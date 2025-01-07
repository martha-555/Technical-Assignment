/** @format */

import { useLocation, useSearchParams } from "react-router-dom";
import classes from "./styles.module.css";
import { useEffect } from "react";
import { PAGE_SIZE } from "../../constants/constants";

type Props = {
  recipeCount: number;
};

const Pagination = ({ recipeCount }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  const location = useLocation();

  const pageParam = searchParams.get("p") || 1;

  const totalPages = Math.ceil(+recipeCount / PAGE_SIZE);
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = (e.target as HTMLButtonElement).innerText;
    newParams.set("p", page.toString());
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (!searchParams.get("p")) {
      newParams.set("p", "1");
      setSearchParams(newParams);
    }
  }, []);

  useEffect(() => {
    if (
      +pageParam * PAGE_SIZE - +recipeCount > 9 &&
      location.pathname == "/selected"
    ) {
      newParams.set("p", (+pageParam - 1).toString());
      setSearchParams(newParams);
    }
  }, [recipeCount, pageParam]);

  const firstPage = pageNumbers.splice(0, 1);
  const lastPage = pageNumbers.splice(pageNumbers.length - 1, 1);
  const pageIndex = +pageParam - 2;

  const buttonElement = (i: number, index?: number) => {
    return (
      <button
        className={
          pageParam == i?.toString() ? classes.activePage : classes.page
        }
        id={i?.toString()}
        onClick={handleClick}
        key={index}
      >
        {i}
      </button>
    );
  };

  const getInnerPart = () => {
    if (+pageParam >= 5 && +pageParam < pageNumbers.length - 1) {
      const part = pageNumbers.slice(pageIndex - 2, pageIndex + 3);
      return (
        <>
          <span>...</span>
          {part.map((i, index) => buttonElement(i, index))}
          <span>...</span>
        </>
      );
    } else if (+pageParam <= 5) {
      const part = pageNumbers.slice(0, 5);
      return (
        <>
          {part.map((i, index) => buttonElement(i, index))}
          <span>...</span>
        </>
      );
    } else {
      const part = pageNumbers.slice(
        pageNumbers.length - 5,
        pageNumbers.length
      );
      return (
        <>
          <span>...</span>
          {part.map((i, index) => buttonElement(i, index))}
        </>
      );
    }
  };

  return (
    <>
      {recipeCount ? (
        <div className={classes.paginationContainer}>
          {buttonElement(firstPage[0])}
          {totalPages > 7 ? (
            <>{getInnerPart()}</>
          ) : (
            pageNumbers.map((item, index) => buttonElement(item, index))
          )}
          {lastPage?.length > 0 ? buttonElement(lastPage[0]) : null}
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
