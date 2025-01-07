/** @format */

import { useContext, useEffect, useState } from "react";
import { RecipeCardType } from "../../types/types";
import classes from "./styles.module.css";
import { CardContext } from "../../context/CardProvider";

type Props = {
  recipe: RecipeCardType;
};

const Card = ({ recipe }: Props) => {
  const [isFound, setIsFound] = useState<boolean>(false);
  const contextData = useContext(CardContext);
  const savedRecipes = contextData.savedRecipes;

  const handleClick = () => {
    isFound ? contextData.deleteRecipe(recipe) : contextData.addRecipe(recipe);
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
