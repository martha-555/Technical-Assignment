/** @format */

import { createContext, ReactElement, useEffect, useState } from "react";
import { RecipeCardType } from "../types/types";
import { useSearchParams } from "react-router-dom";

type ContextType = {
  savedRecipes: RecipeCardType[];
  addRecipe: (data: RecipeCardType) => void;
  deleteRecipe: (data: RecipeCardType) => void;
  //   pageParam: string;
  //   queryParam: string | null;
};

export const CardContext = createContext<ContextType>({
  savedRecipes: [],
  addRecipe: () => {},
  deleteRecipe: () => {},
  //   pageParam: "1",
  //   queryParam: null,
});

const CardProvider = (props: { children: ReactElement }) => {
  const [savedRecipes, setSavedRecipes] = useState<RecipeCardType[]>(
    JSON.parse(localStorage.getItem("saved") || "[]")
  );

  const addRecipe = (data: RecipeCardType) => {
    setSavedRecipes((prev) => [...prev, data]);
  };

  const deleteRecipe = (data: RecipeCardType) => {
    setSavedRecipes(savedRecipes.filter((i) => i.idMeal !== data.idMeal));
  };

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  return (
    <CardContext.Provider value={{ savedRecipes, addRecipe, deleteRecipe }}>
      {props.children}
    </CardContext.Provider>
  );
};
export default CardProvider;
