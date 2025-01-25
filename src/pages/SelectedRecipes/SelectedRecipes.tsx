/** @format */

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useContext } from "react";
import { CardContext } from "../../context/CardProvider";

const SelectedRecipes = () => {
  const contextData = useContext(CardContext);
  const savedRecipes = contextData.savedRecipes;

  if (!savedRecipes || savedRecipes.length === 0) {
    return <div>No saved recipes available.</div>;
  }

  return (
    <PageWrapper>
      <RecipeList recipes={savedRecipes} loading={false} />
    </PageWrapper>
  );
};
export default SelectedRecipes;
