/** @format */

import { useEffect, useState } from "react";
import { RecipeCardType } from "../../types/types";
import classes from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { deleteRecipe, setRecipe } from "../../store/reduxSlice";

type Props = {
  recipe: RecipeCardType;
};

const Card = ({ recipe }: Props) => {
  const [isFound, setIsFound] = useState<boolean>(false);
  const { savedRecipes, loading } = useSelector(
    (state: RootState) => state.recipes
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    isFound ? dispatch(deleteRecipe(recipe)) : dispatch(setRecipe(recipe));
  };

  useEffect(() => {
    const isFoundRecipe = savedRecipes.find(
      (item) => item.idMeal === recipe.idMeal
    );
    isFoundRecipe ? setIsFound(true) : setIsFound(false);
  }, [savedRecipes, isFound, recipe]);

  return (
    <div className={classes.recipeCard}>
      <h3>{recipe.strMeal}</h3>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>Category: {recipe.strCategory}</p>
      <p>Area: {recipe.strArea}</p>
      {
        <button
          onClick={handleClick}
          className={isFound ? classes.isSavedRecipe : classes.likeButton}
        >
          &hearts;
        </button>
      }
    </div>
  );
};

export default Card;
