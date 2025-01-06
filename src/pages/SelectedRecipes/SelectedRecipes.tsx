/** @format */

import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { AppDispatch, RootState } from "../../store/store";
import SearchInput from "../ListOfAllRecipes/SearchInput";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getPageParam,
  getVisibilityRecipes,
  setLoading,
} from "../../store/reduxSlice";

const SelectedRecipes = () => {
  const { savedRecipes, pageParam, valueParam } = useSelector(
    (state: RootState) => state.recipes
  );
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setLoading());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPageParam(searchParams.get("p") || "1"));
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (!valueParam) dispatch(getVisibilityRecipes(savedRecipes));
  }, [pageParam, dispatch, savedRecipes, valueParam]);

  return (
    <PageWrapper>
      <SearchInput />
      <RecipeList />
    </PageWrapper>
  );
};
export default SelectedRecipes;
