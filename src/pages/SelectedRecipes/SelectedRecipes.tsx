/** @format */

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useContext } from "react";
import { CardContext } from "../../context/CardProvider";
import Alert from "@mui/material/Alert";

const SelectedRecipes = () => {
  const contextData = useContext(CardContext);
  const savedRecipes = contextData.savedRecipes;

  return (
    <PageWrapper>
      {savedRecipes.length === 0 ? (
        <Alert severity="error">
          Looks like you haven’t found any favorites yet.
        </Alert>
      ) : (
        <RecipeList recipes={savedRecipes} loading={false} />
      )}
    </PageWrapper>
  );
};
export default SelectedRecipes;
