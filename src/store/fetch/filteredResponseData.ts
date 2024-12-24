/** @format */

import { RecipeCardType } from "../../types/types";

export const filteredResponseData = async (response: Response) => {
  const data = await response.json();
  if (!data.meals) {
    return [];
  }

  const parseData: RecipeCardType[] =
    data?.meals.map((meal: RecipeCardType) => ({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      strMealThumb: meal.strMealThumb,
    })) || [];
  return parseData;
};
