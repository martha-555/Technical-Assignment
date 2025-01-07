/** @format */

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SearchInput from "../ListOfAllRecipes/SearchInput";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useContext } from "react";
import { CardContext } from "../../context/CardProvider";

const SelectedRecipes = () => {
  const contextData = useContext(CardContext);
  const savedRecipes = contextData.savedRecipes;

  return (
    <PageWrapper>
      <SearchInput />
      <RecipeList recipes={savedRecipes} loading={false} />
    </PageWrapper>
  );
};
export default SelectedRecipes;
