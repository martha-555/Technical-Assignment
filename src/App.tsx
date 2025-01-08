/** @format */

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SelectedRecipes from "./pages/SelectedRecipes/SelectedRecipes";
import ListOfAllRecipes from "./pages/ListOfAllRecipes/ListOfAllRecipes";
import { QueryClient, QueryClientProvider } from "react-query";
import FoundRecipes from "./pages/FoundRecipes/FoundRecipes";
import CardProvider from "./context/CardProvider";
import CardDetails from "./pages/CardDetails/CardDetails";

const routers = createBrowserRouter([
  {
    path: "*",
    element: (
      <CardProvider>
        <ListOfAllRecipes />
      </CardProvider>
    ),
  },
  {
    path: "/all_recipes",
    element: (
      <CardProvider>
        <ListOfAllRecipes />
      </CardProvider>
    ),
  },
  {
    path: "/selected",
    element: (
      <CardProvider>
        <SelectedRecipes />
      </CardProvider>
    ),
  },
  {
    path: "/found",
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
]);
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
