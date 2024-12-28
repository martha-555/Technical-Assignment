/** @format */

import { useEffect, useState } from "react";

export const useDebounceSearch = (inputValue: string) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 3000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return debounceValue;
};
