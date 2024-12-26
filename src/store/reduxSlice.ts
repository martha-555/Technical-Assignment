/** @format */

import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { fetchAllRecipes } from "./fetch/fetchAllRecipes";
import { RecipeCardType } from "../types/types";
import { fetchMealByName } from "./fetch/fetchMealByName";
import { useSearchParams } from "react-router-dom";

type RecipeState = {
  recipes: RecipeCardType[];
  recipesByName: RecipeCardType[];
  visibilityRecipes: RecipeCardType[];
  loading: boolean;
  error: string | null;
  currentPage: string;
  pageSize: number;
};

const initialState: RecipeState = {
  recipes: [],
  recipesByName: [],
  visibilityRecipes: [],
  loading: true,
  error: null,
  currentPage: "1",
  pageSize: 10,
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
  reducers: {
    getVisibilityRecipes: (state, action) => {
      +state.currentPage === 1
        ? (state.visibilityRecipes = action.payload?.slice(0, state.pageSize))
        : (state.visibilityRecipes = action.payload?.slice(
            (+state.currentPage - 1) * state.pageSize,
            +state.currentPage * state.pageSize
          ));
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
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

export const { getVisibilityRecipes, setCurrentPage } = reduxSlice.actions;
export default reduxSlice.reducer;
