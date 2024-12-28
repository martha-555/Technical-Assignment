/** @format */

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SelectedRecipes from "./pages/SelectedRecipes/SelectedRecipes";
import ListOfAllRecipes from "./pages/ListOfAllRecipes/ListOfAllRecipes";

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
    path: "/selected",
    element: <SelectedRecipes />,
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
