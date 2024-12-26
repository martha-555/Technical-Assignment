/** @format */

import { useEffect } from "react";
import classes from "./styles.module.css";
import { RecipeCardType } from "../../types/types";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SearchInput from "./SearchInput";
import { fetchMealByName } from "../../store/fetch/fetchMealByName";
import { fetchAllRecipes } from "../../store/fetch/fetchAllRecipes";
import { useDispatch, useSelector } from "react-redux";
import { getVisibilityRecipes } from "../../store/reduxSlice";
import { AppDispatch, RootState } from "../../store/store";

const RecipeList = () => {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("value");

  const { recipes, loading, recipesByName, currentPage, visibilityRecipes } =
    useSelector((state: RootState) => state.recipes);
  const dispatch = useDispatch<AppDispatch>();

  const updateVisibilityRecipe = (data: RecipeCardType[]) => {
    dispatch(getVisibilityRecipes(data));
  };

  useEffect(() => {
    searchValue &&
      recipesByName?.length == 0 &&
      dispatch(fetchMealByName(searchValue));
    !searchValue && recipes?.length == 0 && dispatch(fetchAllRecipes());
  }, [searchValue, dispatch]);

  useEffect(() => {
    searchValue
      ? updateVisibilityRecipe(recipesByName)
      : updateVisibilityRecipe(recipes);
  }, [recipes, recipesByName, loading, currentPage, searchValue]);

  useEffect(() => {}, [recipes, recipesByName, visibilityRecipes, currentPage]);

  return (
    <PageWrapper>
      <SearchInput searchValue={searchValue} />
      <div className={classes.recipeList}>
        <div className={classes.cardContainer}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            visibilityRecipes?.map((recipe, index) => (
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
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default RecipeList;
