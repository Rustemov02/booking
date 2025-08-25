import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Layouts
const PageLayout = lazy(() => import("../pages/Layout"));
const AuthLayout = lazy(() => import("../pages/Auth/Layout"));
const HomePage = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Auth/Login"));
const RegisterPage = lazy(() => import("../pages/Auth/Register"));
const SearchResultPage = lazy(
  () => import("../pages/SearchResult/SearchResult")
);
const FavouritesPage = lazy(() => import("../pages/Favourites/Favourites"));
const CardDetails = lazy(
  () => import("../pages/Home/Cards/CardDetails/Details")
);

const allRoutes = [
  {
    path: "/",
    element: <Navigate to="/hotel" replace />,
  },
  {
    path: "hotel", // I use "hotel" because it is possible to use different path for each page (like flight, apartment, etc.)
    element: (
      <PageLayout>
        <Outlet />
      </PageLayout>
    ),
    roles: null,
    children: [
      //the layout page using as the main element and other pages are in the children array..
      {
        path: "/hotel",
        element: <HomePage />,
      },
      {
        path: "destinations/:id",
        element: <div>Destination Card detail page</div>,
      },
      {
        path: "searchResult",
        element: <SearchResultPage />,
      },
      {
        path: "favourites",
        element: <FavouritesPage />,
      },
      {
        path: "rooms/:id",
        element: <CardDetails />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    roles: null,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  //   roles: null,
  //   children: null,
  // },
];

export default allRoutes;
