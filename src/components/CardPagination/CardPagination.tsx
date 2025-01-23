/** @format */

import classes from "./styles.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { PAGE_SIZE } from "../../constants/constants";
import { usePagination } from "../../hooks/usePagination";
import * as React from "react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";

type Props = {
  recipeCount: number;
};

function Content() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  return (
    <Pagination
      page={page}
      count={10}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/inbox${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}

const CardPagination = ({ recipeCount }: Props) => {
  const { totalPages, currentPage, changeCurrentPage } =
    usePagination(recipeCount);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const filteredPageNumbers = useRef<number[]>([]);
  const firstPage = useRef<number[]>([]);
  const lastPage = useRef<number[]>([]);

  useEffect(() => {
    filteredPageNumbers.current = [];
    const numberOfPage = [];

    for (let i = 1; i <= totalPages; i++) {
      numberOfPage.push(i);
      filteredPageNumbers.current.push(i);
    }

    firstPage.current = filteredPageNumbers.current.splice(0, 1);
    lastPage.current = filteredPageNumbers.current.splice(
      filteredPageNumbers.current.length - 1,
      1
    );
    setPageNumbers(numberOfPage);
  }, [totalPages]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = (e.target as HTMLButtonElement).getAttribute("data-page");
    changeCurrentPage(page || "1");
  };

  useEffect(() => {
    if (pageNumbers.length > 0 && !pageNumbers.includes(+currentPage)) {
      changeCurrentPage((+currentPage - 1).toString());
    }
  }, [pageNumbers]);

  const pageIndex = useMemo(() => +currentPage - 2, [currentPage]);

  const buttonElement = (i: number, index?: number) => {
    return (
      <button
        data-page={i}
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
    if (
      +currentPage >= 5 &&
      +currentPage < filteredPageNumbers.current.length - 1
    ) {
      const part = filteredPageNumbers.current.slice(
        pageIndex - 2,
        pageIndex + 3
      );
      return (
        <>
          <span>...</span>
          {part.map((i, index) => buttonElement(i, index))}
          <span>...</span>
        </>
      );
    } else if (+currentPage <= 5) {
      const part = filteredPageNumbers.current.slice(0, 5);
      return (
        <>
          {part.map((i, index) => buttonElement(i, index))}
          <span>...</span>
        </>
      );
    } else {
      const part = filteredPageNumbers.current.slice(
        filteredPageNumbers.current.length - 5,
        filteredPageNumbers.current.length
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
          {buttonElement(firstPage.current[0])}
          {totalPages > 7 ? (
            <>{getInnerPart()}</>
          ) : (
            filteredPageNumbers.current.map((item, index) =>
              buttonElement(item, index)
            )
          )}
          {lastPage.current?.length > 0
            ? buttonElement(lastPage.current[0])
            : null}
        </div>
      ) : null}
    </>
  );
};

export default CardPagination;
