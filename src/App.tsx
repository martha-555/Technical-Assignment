/** @format */

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SelectedRecipe from "./pages/SelectedRecipe/SelectedRecipe";
import RecipeList from "./pages/RecipeList/RecipeList";

const routers = createBrowserRouter([
  {
    path: "*",
    element: <RecipeList />,
  },
  {
    path: "/all_recipes",
    element: <RecipeList />,
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
