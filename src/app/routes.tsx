import { lazy } from "react";

const HomePage = lazy(() => import("../pages/Home"));

const allRoutes = [
  {
    path: "/",
    element: <HomePage />,
    roles: null,
    children: null,
  },
  {
    path: "/login",
    element: <div>Login page</div>,
    roles: null,
    children: null,
  },
];

export default allRoutes;
