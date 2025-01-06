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
  const { valueParam, recipesByName, pageParam } = useSelector(
    (state: RootState) => state.recipes
  );
  const dispatch = useDispatch<AppDispatch>();
  const debounce = useDebounceSearch(inputValue);

  useEffect(() => {
    dispatch(getValueParam(searchParams.get("value")));
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(getVisibilityRecipes(recipesByName));
  }, [recipesByName, pageParam]);

  useEffect(() => {
    if (debounce) {
      params.set("value", debounce);
      params.set("p", "1");
      setSearchParams(params);
      dispatch(fetchMealByName(debounce));
    }
  }, [debounce, dispatch]);

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
  }, [valueParam, pageParam, dispatch]);

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
