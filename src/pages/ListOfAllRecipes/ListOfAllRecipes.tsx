/** @format */

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SearchInput from "./SearchInput";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useQuery } from "react-query";
import { fetchAllRecipes } from "../../api/fetchAllRecipes";

const ListOfAllRecipes = () => {
  const { data, isLoading, isError } = useQuery("allData", fetchAllRecipes);

  return (
    <PageWrapper>
      {<RecipeList recipes={data || []} loading={isLoading} />}
    </PageWrapper>
  );
};

export default ListOfAllRecipes;
