/** @format */

import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { fetchAllRecipes } from "./fetch/fetchAllRecipes";
import { RecipeCardType } from "../types/types";
import { fetchMealByName } from "./fetch/fetchMealByName";

interface RecipeState {
  recipes: RecipeCardType[];
  recipesByName: RecipeCardType[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  recipesByName: [],
  loading: true,
  error: null,
};

const handlePending = (state: RecipeState) => {
  state.loading = true;
};

const handleRejected = (
  state: RecipeState,
  action: PayloadAction<unknown, string, unknown, SerializedError>
) => {
  state.loading = false;
  state.error = action.error.message || "error!!!";
};

const reduxSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllRecipes.pending, handlePending);
    builder.addCase(fetchAllRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllRecipes.rejected, handleRejected);
    builder.addCase(fetchMealByName.pending, handlePending);
    builder.addCase(fetchMealByName.fulfilled, (state, action) => {
      state.recipesByName = action.payload;

      state.loading = false;
    });
    builder.addCase(fetchMealByName.rejected, handleRejected);
  },
});

export default reduxSlice.reducer;
