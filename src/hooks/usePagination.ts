/** @format */

import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE } from "../constants/constants";
import { useSearchParams } from "react-router-dom";

export const usePagination = (recipeCount: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string>(
    searchParams.get("page") || "1"
  );
  const newParams = new URLSearchParams(searchParams);
  const totalPages = useMemo(
    () => Math.ceil(+recipeCount / PAGE_SIZE),
    [recipeCount, PAGE_SIZE]
  );

  const changeCurrentPage = (value: string) => {
    if (+value < 1) value = "1";
    setCurrentPage(value);
    newParams.set("page", value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    console.log({ currentPage });
    console.log({ totalPages });
    if (+currentPage > totalPages) changeCurrentPage(totalPages.toString());
  }, [totalPages]);

  useEffect(() => {
    if (!currentPage) {
      changeCurrentPage("1");
    }
  }, []);

  return { currentPage, totalPages, changeCurrentPage };
};
