/** @format */

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { routes } from "./routes/routes";

const routers = createBrowserRouter(routes);
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
