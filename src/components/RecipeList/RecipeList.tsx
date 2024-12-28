/** @format */
import classes from "./styles.module.css";
import SearchInput from "../../pages/ListOfAllRecipes/SearchInput";
import PageWrapper from "../PageWrapper/PageWrapper";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const RecipeList = () => {
  const { visibilityRecipes, loading } = useSelector(
    (state: RootState) => state.recipes
  );

  return (
    <div className={classes.recipeList}>
      <div className={classes.cardContainer}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          visibilityRecipes?.map((recipe, index) => (
            <Card key={index} recipe={recipe} />
          )) || <div>За Вашим запитом нічого не знайдено </div>
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default RecipeList;
