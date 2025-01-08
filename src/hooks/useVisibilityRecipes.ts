/** @format */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RecipeCardType } from "../types/types";
import { PAGE_SIZE } from "../constants/constants";

export const useVisibilityRecipes = (
  data: RecipeCardType[] | [],
  loading: boolean
) => {
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("p") || "1";
  const [visibilityRecipes, setVisibilityRecipes] = useState<RecipeCardType[]>(
    []
  );

  useEffect(() => {
    if (!loading) {
      pageParam == "1"
        ? setVisibilityRecipes(data?.slice(0, PAGE_SIZE))
        : setVisibilityRecipes(
            data?.slice((+pageParam - 1) * PAGE_SIZE, +pageParam * PAGE_SIZE)
          );
    }
  }, [pageParam, loading, data]);

  return visibilityRecipes;
};
