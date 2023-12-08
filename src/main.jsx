import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.jsx";
import "./index.css";

import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import RQFetch from "./components/RQFetch.jsx";
import Home from "../src/components/Home.jsx";

import { QueryClientProvider, QueryClient } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <RQFetch />,
      },
    ],
  },
]);
//create new instance of queryClient
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
