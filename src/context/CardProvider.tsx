/** @format */

import { createContext, ReactElement, useEffect, useState } from "react";
import { RecipeCardType } from "../types/types";

type ContextType = {
  savedRecipes: RecipeCardType[];
  addRecipe: (data: RecipeCardType) => void;
  deleteRecipe: (data: RecipeCardType) => void;
};

export const CardContext = createContext<ContextType>({
  savedRecipes: [],
  addRecipe: () => {},
  deleteRecipe: () => {},
});

const CardProvider = (props: { children: ReactElement }) => {
  const [savedRecipes, setSavedRecipes] = useState<RecipeCardType[]>(
    JSON.parse(localStorage.getItem("saved") || "[]")
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved") || "[]");
    setSavedRecipes(saved);
  }, []);

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
