/** @format */

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ListOfAllRecipes from "./ListOfAllRecipes/ListOfAllRecipes";
import SelectedRecipe from "./SelectedRecipe/SelectedRecipe";

const routers = createBrowserRouter([
  {
    path: "*",
    element: <ListOfAllRecipes />,
  },
  {
    path: "/all_recipes",
    element: <ListOfAllRecipes />,
  },
  {
    path: "/favorite",
    element: <SelectedRecipe />,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={routers}></RouterProvider>
    </div>
  );
}

export default App;
