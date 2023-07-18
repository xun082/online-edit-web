import React, { FC, lazy } from "react";
import { useRoutes } from "react-router-dom";

const Home = lazy(() => import("@/pages/home"));
const Edit = lazy(() => import("@/pages/edit"));

const RouterConfig: FC = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/edit", element: <Edit /> },
  ]);
};

export default RouterConfig;
