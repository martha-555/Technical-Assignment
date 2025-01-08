/** @format */
import classes from "./styles.module.css";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { RecipeCardType } from "../../types/types";
import { useVisibilityRecipes } from "../../hooks/useVisibilityRecipes";

type Props = {
  recipes: RecipeCardType[];
  loading: boolean;
};
const RecipeList = ({ recipes, loading }: Props) => {
  const visibilityRecipes = useVisibilityRecipes(recipes, loading);

  return (
    <div className={classes.recipeList}>
      <div className={classes.cardContainer}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          (visibilityRecipes.length > 0 &&
            visibilityRecipes?.map((recipe, index) => (
              <Card key={index} recipe={recipe} />
            ))) || <div>За Вашим запитом нічого не знайдено </div>
        )}
      </div>
      {!loading && <Pagination recipeCount={recipes.length} />}
    </div>
  );
};

export default RecipeList;
