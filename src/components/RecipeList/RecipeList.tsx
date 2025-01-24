/** @format */
import classes from "./styles.module.css";
import { RecipeCardType } from "../../types/types";
import { useVisibilityRecipes } from "../../hooks/useVisibilityRecipes";
import RecipeCard from "../RecipeCard/RecipeCard";
import { useSearchParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import CardPagination from "../CardPagination/CardPagination";

type Props = {
  recipes: RecipeCardType[];
  loading: boolean;
};
const RecipeList = ({ recipes, loading }: Props) => {
  const visibilityRecipes = useVisibilityRecipes(recipes, loading);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("query");

  return (
    <div className={classes.recipeList}>
      {queryParam && <div className={classes.queryParam}>{queryParam}</div>}
      <div className={classes.cardContainer}>
        {loading ? (
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
            <CircularProgress color="success" />
            <CircularProgress color="inherit" />
          </Stack>
        ) : (
          visibilityRecipes.length > 0 &&
          visibilityRecipes?.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))
        )}
      </div>
      {!loading && <CardPagination recipeCount={recipes.length} />}
    </div>
  );
};

export default RecipeList;
