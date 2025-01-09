/** @format */

import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE } from "../constants/constants";
import { useSearchParams } from "react-router-dom";

export const usePagination = (recipeCount: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string>(
    searchParams.get("p") || "1"
  );
  const newParams = new URLSearchParams(searchParams);
  const totalPages = useMemo(
    () => Math.ceil(+recipeCount / PAGE_SIZE),
    [recipeCount, PAGE_SIZE]
  );

  const changeCurrentPage = (value: string) => {
    setCurrentPage(value);
    newParams.set("p", value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (!currentPage) {
      changeCurrentPage("1");
    }
  }, []);

  return { currentPage, totalPages, changeCurrentPage };
};
