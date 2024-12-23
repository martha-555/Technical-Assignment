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
import { fetchAllRecipes } from "../api/fetchAllRecipes";
import { fetchMealByName } from "../api/fetchMealByName";
import SearchInput from "./SearchInput";

const ListOffetchAllRecipes = () => {
  const [list, setList] = useState<RecipeCardType[]>([]);
  const [searchList, setSearchList] = useState<RecipeCardType[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visibilityRecipe, setVisibilityRecipe] = useState<RecipeCardType[]>(
    []
  );
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("p") || 1;
  const searchValue = searchParams.get("value");
  const alphabet = useMemo(() => "abcdefghijklmnopqrstuvwxyz".split(""), []);
  const PAGE_SIZE = 10;

  const getAllRecipes = useCallback(async () => {
    const data = await fetchAllRecipes(alphabet);
    setIsLoading(false);
    if (data) setList(data.flat());
  }, [alphabet, setIsLoading, setList]);

  const getMealByName = async (name: string) => {
    const data = await fetchMealByName(name);
    setIsLoading(false);
    if (data) setSearchList(data.meals);
  };

  const updateVisibilityRecipe = (data: RecipeCardType[]) => {
    +currentPage === 1
      ? setVisibilityRecipe(data?.slice(0, PAGE_SIZE))
      : setVisibilityRecipe(
          data?.slice((+currentPage - 1) * PAGE_SIZE, +currentPage * PAGE_SIZE)
        );
  };

  useEffect(() => {
    searchValue && searchList?.length == 0 && getMealByName(searchValue);
    !searchValue && list?.length == 0 && getAllRecipes();
  }, [searchValue]);

  useEffect(() => {
    searchValue
      ? updateVisibilityRecipe(searchList)
      : updateVisibilityRecipe(list);
  }, [list, isLoading, searchList, currentPage, searchValue]);

  return (
    <PageWrapper>
      <SearchInput getMealByName={getMealByName} searchValue={searchValue} />
      <div className={classes.recipeList}>
        <div className={classes.cardContainer}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            visibilityRecipe?.map((recipe, index) => (
              <Card key={index} recipe={recipe} />
            )) || <div>За Вашим запитом нічого не знайдено </div>
          )}
        </div>

        {!isLoading && (
          <Pagination
            numberOfRecipes={
              (searchValue && searchList?.length) ||
              (!searchValue && list?.length) ||
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
