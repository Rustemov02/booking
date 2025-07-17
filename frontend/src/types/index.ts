import { JSX, ReactNode } from "react";

export interface RouteType {
  path: string;
  element: JSX.Element | ReactNode;
  roles?: Array<number> | null;
  children?: RouteType[] | null;
}

export interface CardDataTypes {
  _id: string;
  name: string;
  text?: string;
  rating?: number | null;
  sun?: number | null;
  date?: string;
  description?: string;
  isSaved?: boolean;
  hasBreakfast?: boolean;
  price?: number;
  available: boolean;
  capacity: number;
  petFriendly: boolean;
}
export interface CardTypes {
  basePath?: string | ((id: string) => string);
  onClick?: () => void;
  className?: string;
  position?: string;
  setIsSaved?: (isSaved: boolean) => void;
  personCount?: { adult: number; children: number };
  // possibleSave?: boolean; // for heart icon
  data: CardDataTypes;
}

export interface BookingBarTypes {
  checkIn: Date | string | null;
  checkOut: Date | string | null;
  adults: number;
  children: number;
  rooms: number;
  petFriendly?: boolean;
}

export interface RoomTypes {
  _id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerNight: number;
  totalPrice: number;
  available: boolean;
  isSaved: boolean;
  images: string[];
  amenities: string[];
  cancellationPolicy: string;
  roomSize: number;
  bedType: string;
  petFriendly: boolean;
}
