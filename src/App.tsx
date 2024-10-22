/** @format */

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ListOfAllRecipes from "./ListOfAllRecipes/ListOfAllRecipes";

const routers = createBrowserRouter([
  {
    path: "*",
    element: <ListOfAllRecipes />,
  },
  {
    path: "/list",
    element: <ListOfAllRecipes />,
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
