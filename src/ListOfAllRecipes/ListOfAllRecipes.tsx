/** @format */

import { useCallback, useEffect, useState } from "react";
import classes from "./styles.module.css";
import { RecipeCardType } from "../types/types";
import Pagination from "../Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import Card from "../Card/Card";

const ListOfAllRecipes = () => {
  const [list, setList] = useState<RecipeCardType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visibilityRecipe, setVisibilityRecipe] = useState<RecipeCardType[]>(
    []
  );
  const [searchClick, setSearchClick] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const PAGE_SIZE = 10;
  const pageNumber = searchParams.get("p") || 1;

  const fetchDataForLetter = useCallback(async (letter: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const data = await response.json();

    const filteredData =
      data.meals?.map((meal: any) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strMealThumb: meal.strMealThumb,
      })) || [];

    setList((list) => [...list, ...filteredData]);
  }, []);

  const fetchAllData = async () => {
    for (const letter of alphabet) {
      await fetchDataForLetter(letter);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  console.log(list);
  const updateVisibilityRecipe = () => {
    if (!isLoading) {
      setSearchClick(false);
      +pageNumber === 1
        ? setVisibilityRecipe(list.slice(0, PAGE_SIZE))
        : setVisibilityRecipe(
            list.slice(
              +pageNumber * PAGE_SIZE,
              +pageNumber * PAGE_SIZE + PAGE_SIZE
            )
          );
    }
  };

  useEffect(() => {
    updateVisibilityRecipe();
  }, [isLoading, pageNumber]);

  const fetchMealByName = async (name: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await response.json();
    setVisibilityRecipe(data.meals);
  };

  const handleSearchClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (e.key === "Enter") {
      fetchMealByName(value);
      setSearchClick(true);
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="search"
          className={classes.searchInput}
          type="search"
          onKeyDown={handleSearchClick}
        />
      </div>
      {searchClick && (
        <button className={classes.backButton} onClick={updateVisibilityRecipe}>
          Back
        </button>
      )}
      <div className={classes.recipeList}>
        <div className={classes.cardContainer}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            visibilityRecipe.map((recipe, index) => (
              <Card key={index} recipe={recipe} />
            ))
          )}
        </div>

        {!isLoading && (
          <Pagination
            numberOfRecipes={
              searchClick ? visibilityRecipe.length : list.length
            }
            pageSize={PAGE_SIZE}
          />
        )}
      </div>
    </div>
  );
};

export default ListOfAllRecipes;
