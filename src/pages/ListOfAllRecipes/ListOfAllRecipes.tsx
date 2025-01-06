/** @format */

import { useEffect } from "react";
import { RecipeCardType } from "../../types/types";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SearchInput from "./SearchInput";
import { fetchAllRecipes } from "../../store/fetch/fetchAllRecipes";
import { useDispatch, useSelector } from "react-redux";
import {
  getPageParam,
  getValueParam,
  getVisibilityRecipes,
} from "../../store/reduxSlice";
import { AppDispatch, RootState } from "../../store/store";
import RecipeList from "../../components/RecipeList/RecipeList";

const ListOfAllRecipes = () => {
  const [searchParams] = useSearchParams();

  const { recipes, loading, pageParam, visibilityRecipes, valueParam } =
    useSelector((state: RootState) => state.recipes);
  const dispatch = useDispatch<AppDispatch>();

  const updateVisibilityRecipe = (data: RecipeCardType[]) => {
    dispatch(getVisibilityRecipes(data));
  };

  useEffect(() => {
    dispatch(getValueParam(searchParams.get("value")));
    dispatch(getPageParam(searchParams.get("p") || "1"));
  }, [searchParams, dispatch, loading]);

  useEffect(() => {
    !valueParam && recipes?.length == 0 && dispatch(fetchAllRecipes());
    if (!loading) {
    }
  }, [valueParam, dispatch, loading]);

  useEffect(() => {
    if (!valueParam) updateVisibilityRecipe(recipes);
  }, [recipes, loading, pageParam, valueParam]);

  return (
    <PageWrapper>
      <SearchInput />
      {!loading && <RecipeList />}
    </PageWrapper>
  );
};

export default ListOfAllRecipes;
