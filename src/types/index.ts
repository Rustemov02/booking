import { JSX, ReactNode } from "react";

export interface RouteType {
  path: string;
  element: JSX.Element | ReactNode;
  roles?: Array<number> | null;
  children?: RouteType[] | null;
}

export interface CardTypes {
  id: number;
  basePath?: string | ((id: string) => string);
  possibleSave?: boolean; // for heart icon
  title: string;
  text?: string;
  rating?: number | null; // for rating number
  sun?: number | null;
  date?: string;
  desc?: string;
  isSaved?: boolean;
  setIsSaved?: (isSaved: boolean) => void;
  onClick?: () => void;
  position?: string;
}

export interface BookingBarTypes {
  checkIn: Date | string | null;
  checkOut: Date | string | null;
  adults: number;
  children: number;
  rooms: number;
  withPet: boolean;
}
