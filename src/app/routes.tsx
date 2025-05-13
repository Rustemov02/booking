import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = lazy(() => import("../pages/Home"));

const allRoutes = [
  {
    path: "/",
    element: <Navigate to="/hotel" replace />,
  },
  {
    path: "hotel", // I use "hotel" because it is possible to use different path for each page (like flight, apartment, etc.)
    element: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HomePage />
      </motion.div>
    ), //you should use here Layout component (if you have one)
    roles: null,
    children: [],
  },
  {
    path: "hotel/destinations/:id",
    element: <div>Destination Card detail page</div>,
    roles: null,
  },
  {
    path: "/login",
    element: <div>Login page</div>,
    roles: null,
    children: null,
  },
];

export default allRoutes;
