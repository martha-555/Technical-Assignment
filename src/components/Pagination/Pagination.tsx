/** @format */

import { useLocation } from "react-router-dom";
import classes from "./styles.module.css";
import { useEffect, useMemo } from "react";
import { PAGE_SIZE } from "../../constants/constants";
import { usePagination } from "../../hooks/usePagination";

type Props = {
  recipeCount: number;
};

const Pagination = ({ recipeCount }: Props) => {
  const location = useLocation();
  const pageNumbers: number[] = [];
  const { totalPages, currentPage, changeCurrentPage } =
    usePagination(recipeCount);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = (e.target as HTMLButtonElement).innerText;
    changeCurrentPage(page);
  };

  useEffect(() => {
    if (!currentPage) {
      changeCurrentPage("1");
    }
  }, []);

  useEffect(() => {
    if (
      +currentPage * PAGE_SIZE - +recipeCount > 9 &&
      location.pathname == "/selected"
    ) {
      changeCurrentPage((+currentPage - 1).toString());
    }
  }, [recipeCount, currentPage]);

  const firstPage = useMemo(() => pageNumbers.splice(0, 1), [pageNumbers]);
  const lastPage = useMemo(
    () => pageNumbers.splice(pageNumbers.length - 1, 1),
    [pageNumbers]
  );
  const pageIndex = useMemo(() => +currentPage - 2, [currentPage]);

  const buttonElement = (i: number, index?: number) => {
    return (
      <button
        className={
          currentPage == i?.toString() ? classes.activePage : classes.page
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
    if (+currentPage >= 5 && +currentPage < pageNumbers.length - 1) {
      const part = pageNumbers.slice(pageIndex - 2, pageIndex + 3);
      return (
        <>
          <span>...</span>
          {part.map((i, index) => buttonElement(i, index))}
          <span>...</span>
        </>
      );
    } else if (+currentPage <= 5) {
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
