/** @format */

import { useContext, useEffect, useState } from "react";
import { RecipeCardType } from "../../types/types";
import classes from "./styles.module.css";
import { CardContext } from "../../context/CardProvider";
import { useQuery } from "react-query";
import { fetchCardDetails } from "../../api/fetchCardDetails";
import { useNavigate } from "react-router-dom";

type Props = {
  recipe: RecipeCardType;
};

const Card = ({ recipe }: Props) => {
  const [isFound, setIsFound] = useState<boolean>(false);
  const contextData = useContext(CardContext);
  const savedRecipes = contextData.savedRecipes;
  const navigate = useNavigate();

  const handleClick = () => {
    isFound ? contextData.deleteRecipe(recipe) : contextData.addRecipe(recipe);
  };

  useEffect(() => {
    const isFoundRecipe = savedRecipes.find(
      (item) => item.idMeal === recipe.idMeal
    );

    isFoundRecipe ? setIsFound(true) : setIsFound(false);
  }, [savedRecipes, isFound, recipe]);

  const handleViewDetails = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLDivElement).id;
    if (id) navigate(`/details?id=${id}`);
  };

  return (
    <div
      id={recipe.idMeal}
      className={classes.recipeCard}
      onClick={handleViewDetails}
    >
      <h3 id={recipe.idMeal}>{recipe.strMeal}</h3>
      <img id={recipe.idMeal} src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p id={recipe.idMeal}>Category: {recipe.strCategory}</p>
      <p id={recipe.idMeal}>Area: {recipe.strArea}</p>
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
