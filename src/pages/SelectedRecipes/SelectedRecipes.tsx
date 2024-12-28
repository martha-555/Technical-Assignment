/** @format */

import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { AppDispatch, RootState } from "../../store/store";
import SearchInput from "../ListOfAllRecipes/SearchInput";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getPageParam, getVisibilityRecipes } from "../../store/reduxSlice";

const SelectedRecipes = () => {
  const { savedRecipes, pageParam, visibilityRecipes, loading, valueParam } =
    useSelector((state: RootState) => state.recipes);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPageParam(searchParams.get("p") || "1"));
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (!valueParam) dispatch(getVisibilityRecipes(savedRecipes));
    console.log({ savedRecipes });
  }, [pageParam, dispatch, savedRecipes, valueParam]);

  // console.log({ loading });
  useEffect(() => {}, [loading]);
  return (
    <PageWrapper>
      <SearchInput />
      <RecipeList />
    </PageWrapper>
  );
};
export default SelectedRecipes;
