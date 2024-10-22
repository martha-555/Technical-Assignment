/** @format */

import { RecipeCardType } from "../types/types";
import classes from "./styles.module.css";

type Props = {
  recipe: RecipeCardType;
};

const Card = (props: Props) => {
  return (
    <div className={classes.recipeCard}>
      <h3>{props.recipe.strMeal}</h3>
      <img src={props.recipe.strMealThumb} alt={props.recipe.strMeal} />
      <p>Category: {props.recipe.strCategory}</p>
      <p>Area: {props.recipe.strArea}</p>
    </div>
  );
};

export default Card;
