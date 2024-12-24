/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RecipeCardType } from "../../types/types";

export const fetchMealByName = createAsyncThunk<RecipeCardType[], string>(
  "fetch by name",
  async (name: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await response.json();
    return data.meals;
  }
);
