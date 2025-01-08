/** @format */

import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE } from "../constants/constants";
import { useSearchParams } from "react-router-dom";

export const usePagination = (recipeCount: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string>(
    searchParams.get("p") || "1"
  );
  const [totalPages, setTotalPages] = useState<number>(0);
  const newParams = new URLSearchParams(searchParams);
  const pageCount = useMemo(
    () => Math.ceil(+recipeCount / PAGE_SIZE),
    [recipeCount, PAGE_SIZE]
  );

  const changeCurrentPage = (value: string) => {
    setCurrentPage(value);
    newParams.set("p", value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    setTotalPages(pageCount);
  }, [recipeCount]);

  return { currentPage, totalPages, changeCurrentPage };
};
