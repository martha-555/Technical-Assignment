/** @format */

import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SearchInput from "../ListOfAllRecipes/SearchInput";
import { useQuery } from "react-query";
import { fetchMealByName } from "../../api/fetchMealByName";
import RecipeList from "../../components/RecipeList/RecipeList";
import Alert from "@mui/material/Alert";

const FoundRecipes = () => {
  const [searhParams] = useSearchParams();
  const query = searhParams.get("query") || "";
  const { data, isLoading, isError } = useQuery(["foundRecipes", query], () =>
    fetchMealByName(query)
  );

  return (
    <PageWrapper>
      {!isLoading && data?.length == 0 ? (
        <Alert severity="error">За Вашим запитом нічого не знайдено</Alert>
      ) : (
        <RecipeList recipes={data || []} loading={isLoading} />
      )}
    </PageWrapper>
  );
};
export default FoundRecipes;
