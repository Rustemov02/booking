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
  onClick?: (id: string) => void;
  className?: string;
  position?: string;
  version?: "grid" | "list";
  setIsSaved?: (isSaved: boolean, id?: string) => void;
  personCount?: { adult: number; children: number };
  // possibleSave?: boolean; // for heart icon
  data: CardDataTypes;
  setData?: React.Dispatch<React.SetStateAction<RoomTypes[]>>;
}

export interface BookingBarTypes {
  destination: string | null;
  checkIn: Date | string | null;
  checkOut: Date | string | null;
  rooms: number;
  guests: {
    label: string;
    title: string;
    count: number;
  }[];
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
