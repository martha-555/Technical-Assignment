/** @format */

import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SearchInput from "../ListOfAllRecipes/SearchInput";
import { useQuery } from "react-query";
import { fetchMealByName } from "../../api/fetchMealByName";
import RecipeList from "../../components/RecipeList/RecipeList";

const FoundRecipes = () => {
  const [searhParams] = useSearchParams();
  const query = searhParams.get("query") || "";
  const { data, isLoading, isError } = useQuery(["foundRecipes", query], () =>
    fetchMealByName(query)
  );

  return (
    <PageWrapper>
      {/* <SearchInput /> */}
      <RecipeList recipes={data || []} loading={isLoading} />
    </PageWrapper>
  );
};
export default FoundRecipes;
