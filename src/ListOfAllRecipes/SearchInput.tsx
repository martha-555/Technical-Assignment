/** @format */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./styles.module.css";
import { fetchMealByName } from "../store/fetch/fetchMealByName";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

type Props = {
  searchValue: string | null;
};

const SearchInput = ({ searchValue }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 3000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    if (debounceValue && searchValue) {
      dispatch(fetchMealByName(searchValue));

      params.set("value", debounceValue);
      setSearchParams(params);
    }
  }, [debounceValue]);

  useEffect(() => {
    if (!searchValue) setInputValue("");
  }, [searchValue]);

  const handleSearchClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let value = (e.target as HTMLInputElement).value;
    if (e.key === "Enter") {
      value
        ? setSearchParams({ p: "1", value: value })
        : setSearchParams({ p: "1" });

      dispatch(fetchMealByName(value));
    }
  };

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
      <span>{searchValue}</span>
    </div>
  );
};
export default SearchInput;
