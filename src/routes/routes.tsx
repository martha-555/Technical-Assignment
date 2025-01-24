/** @format */

import CardProvider from "../context/CardProvider";
import CardDetails from "../pages/CardDetails/CardDetails";
import FoundRecipes from "../pages/FoundRecipes/FoundRecipes";
import ListOfAllRecipes from "../pages/ListOfAllRecipes/ListOfAllRecipes";
import SelectedRecipes from "../pages/SelectedRecipes/SelectedRecipes";

export const routes = [
  {
    path: "*",
    element: (
      <CardProvider>
        <ListOfAllRecipes />
      </CardProvider>
    ),
  },
  {
    path: "/all_recipes/*",
    element: (
      <CardProvider>
        <ListOfAllRecipes />
      </CardProvider>
    ),
  },
  {
    path: "/selected/*",
    element: (
      <CardProvider>
        <SelectedRecipes />
      </CardProvider>
    ),
  },
  {
    path: "/found/*",
    element: (
      <CardProvider>
        <FoundRecipes />
      </CardProvider>
    ),
  },
  {
    path: "/details",
    element: (
      <CardProvider>
        <CardDetails />
      </CardProvider>
    ),
  },
];
