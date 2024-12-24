/** @format */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./styles.module.css";
import { RecipeCardType } from "../types/types";
import Pagination from "../Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import Card from "../Card/Card";
import PageWrapper from "../PageWrapper/PageWrapper";
import SearchInput from "./SearchInput";
import { fetchMealByName } from "../store/fetch/fetchMealByName";
import { fetchAllRecipes } from "../store/fetch/fetchAllRecipes";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";

const ListOffetchAllRecipes = () => {
  const [visibilityRecipe, setVisibilityRecipe] = useState<RecipeCardType[]>(
    []
  );
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("p") || 1;
  const searchValue = searchParams.get("value");

  const PAGE_SIZE = 10;
  const { recipes, loading, error, recipesByName } = useSelector(
    (state: RootState) => state.recipes
  );
  const dispatch = useDispatch<AppDispatch>();

  const updateVisibilityRecipe = (data: RecipeCardType[]) => {
    +currentPage === 1
      ? setVisibilityRecipe(data?.slice(0, PAGE_SIZE))
      : setVisibilityRecipe(
          data?.slice((+currentPage - 1) * PAGE_SIZE, +currentPage * PAGE_SIZE)
        );
  };

  useEffect(() => {
    searchValue &&
      recipesByName?.length == 0 &&
      dispatch(fetchMealByName(searchValue));
    !searchValue && recipes?.length == 0 && dispatch(fetchAllRecipes());
  }, [searchValue, dispatch]);

  useEffect(() => {
    // if (searchValue) dispatch(fetchMealByName(searchValue));
  }, [dispatch, searchValue]);

  useEffect(() => {
    searchValue
      ? updateVisibilityRecipe(recipesByName)
      : updateVisibilityRecipe(recipes);
  }, [recipes, recipesByName, loading, currentPage, searchValue]);

  useEffect(() => {
    // console.log(recipesByName);
  }, [recipes, recipesByName]);

  return (
    <PageWrapper>
      <SearchInput searchValue={searchValue} />
      <div className={classes.recipeList}>
        <div className={classes.cardContainer}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            visibilityRecipe?.map((recipe, index) => (
              <Card key={index} recipe={recipe} />
            )) || <div>За Вашим запитом нічого не знайдено </div>
          )}
        </div>

        {!loading && (
          <Pagination
            numberOfRecipes={
              (searchValue && recipesByName?.length) ||
              (!searchValue && recipes?.length) ||
              0
            }
            pageSize={PAGE_SIZE}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default ListOffetchAllRecipes;
