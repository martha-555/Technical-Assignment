/** @format */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./styles.module.css";
import { fetchMealByName } from "../../store/fetch/fetchMealByName";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getValueParam, getVisibilityRecipes } from "../../store/reduxSlice";
import { useDebounceSearch } from "../../hooks/useDebounceSearch";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { valueParam, visibilityRecipes, recipesByName, pageParam, loading } =
    useSelector((state: RootState) => state.recipes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getValueParam(searchParams.get("value")));
  }, [searchParams, dispatch]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebounceValue(inputValue);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [inputValue]);

  const debounce = useDebounceSearch(inputValue);

  useEffect(() => {
    console.log({ recipesByName });
    dispatch(getVisibilityRecipes(recipesByName));
  }, [recipesByName, pageParam]);

  useEffect(() => {
    if (debounce) {
      params.set("value", debounce);
      params.set("p", "1");
      setSearchParams(params);
      dispatch(fetchMealByName(debounce));
    }
  }, [debounce]);

  useEffect(() => {
    if (!valueParam) setInputValue("");
  }, [valueParam]);

  const handleSearchClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let value = (e.target as HTMLInputElement).value;
    if (e.key === "Enter") {
      value
        ? setSearchParams({ p: "1", value: value })
        : setSearchParams({ p: "1" });
    }
  };

  useEffect(() => {
    if (valueParam) dispatch(fetchMealByName(valueParam));
  }, [valueParam, pageParam]);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setInputValue(value);
  };
  return (
    <div>
      <input
        value={inputValue}
        onInput={onInput}
        placeholder="search"
        className={classes.searchInput}
        type="search"
        onKeyDown={handleSearchClick}
      />
      <span>{valueParam}</span>
    </div>
  );
};
export default SearchInput;
