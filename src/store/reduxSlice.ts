/** @format */

import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { fetchAllRecipes } from "./fetch/fetchAllRecipes";
import { RecipeCardType } from "../types/types";
import { fetchMealByName } from "./fetch/fetchMealByName";

type RecipeState = {
  recipes: RecipeCardType[];
  recipesByName: RecipeCardType[];
  visibilityRecipes: RecipeCardType[];
  savedRecipes: RecipeCardType[];
  loading: boolean;
  error: string | null;
  pageSize: number;
  valueParam: string | null;
  pageParam: string;
};

const initialState: RecipeState = {
  recipes: [],
  recipesByName: [],
  visibilityRecipes: [],
  savedRecipes: JSON.parse(localStorage.getItem("saved") || "[]"),
  loading: true,
  error: null,
  pageSize: 10,
  valueParam: null,
  pageParam: "1",
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
      state.pageParam == "1"
        ? (state.visibilityRecipes = action.payload?.slice(0, state.pageSize))
        : (state.visibilityRecipes = action.payload?.slice(
            (+state.pageParam - 1) * state.pageSize,
            +state.pageParam * state.pageSize
          ));
    },

    setRecipe: (state, action) => {
      state.savedRecipes = [...state.savedRecipes, action.payload];
      localStorage.setItem("saved", JSON.stringify(state.savedRecipes));
    },
    deleteRecipe: (state, action) => {
      state.savedRecipes = state.savedRecipes.filter(
        (item) => item.idMeal !== action.payload.idMeal
      );
      localStorage.setItem("saved", JSON.stringify(state.savedRecipes));
    },
    getValueParam: (state, action) => {
      state.valueParam = action.payload;
    },
    getPageParam: (state, action) => {
      state.pageParam = action.payload;
    },
    setLoading: (state) => {
      if (state.loading) state.loading = false;
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

export const {
  getVisibilityRecipes,
  setRecipe,
  deleteRecipe,
  getValueParam,
  getPageParam,
  setLoading,
} = reduxSlice.actions;
export default reduxSlice.reducer;
