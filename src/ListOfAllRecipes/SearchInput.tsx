/** @format */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./styles.module.css";

type Props = {
  getMealByName: (name: string) => Promise<void>;
  searchValue: string | null;
};

const SearchInput = ({ getMealByName, searchValue }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 3000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    if (debounceValue) {
      getMealByName(debounceValue);
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

      getMealByName(value);
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
