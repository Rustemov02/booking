import { Route, Routes } from "react-router-dom";
import allRoutes from "./routes";
import { ReactNode } from "react";
import { RouteType } from "../types";

const ConfigureRoutes = () => {
  const renderRoutes = (routes: RouteType[]): ReactNode => {
    return (
      routes &&
      routes.map((route: RouteType) => (
        <Route path={route.path} element={route.element} key={route.path}>
          {route.children && renderRoutes(route.children)}
        </Route>
      ))
    );
  };
  return <Routes>{allRoutes && renderRoutes(allRoutes)}</Routes>;
};

export default ConfigureRoutes;
