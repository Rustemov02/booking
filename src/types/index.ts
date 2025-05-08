import { JSX, ReactNode } from "react";

export interface RouteType {
  path: string;
  element: JSX.Element | ReactNode;
  roles: Array<number> | null;
  children: RouteType[] | null;
}
