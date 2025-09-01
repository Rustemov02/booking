import HotelIcon from "../../assets/svg/hotel.svg";
import peopleAdd from "../../assets/svg/peopleAdd.svg";
import CalendarIcon from "../../assets/svg/calendar.svg?react";
import ArrowDown from "../../assets/svg/arrow-down.svg?react";
import { DatePicker } from "rsuite";
import { useEffect, useState } from "react";
import styles from "./bar.module.css";
import Counter from "../counter/Counter";
import Switch from "../toggleSwitch/Switch";
import Close from "../../assets/svg/Close";
import { BookingBarTypes } from "../../types";
import toast from "react-hot-toast";
import useClickOutSide from "../../hooks/useClickOutside";
import { useLocation, useNavigate } from "react-router-dom";
import apiRequest from "../../api/apiRequest";

const BookingBar = ({
  extraStyle,
  data,
}: {
  extraStyle?: string;
  data?: BookingBarTypes;
}) => {
  // structure
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [isPersonalModalOpen, setIsPersonalModalOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  //data
  const [bookingData, setBookingData] = useState<BookingBarTypes>(
    data || {
      checkIn: null,
      checkOut: null,
      adults: 1,
      children: 0,
      rooms: 1,
      petFriendly: false,
    }
  );

  const clearCheckData = (type: "checkIn" | "checkOut") => {
    setBookingData((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    const queryParams = Object.entries(bookingData).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>
    );
    const params = new URLSearchParams(queryParams);

    const currentPath = location.pathname;

    const basePath = currentPath.includes("searchResult") ? "" : "searchResult";

    navigate(`${basePath}?${params}`);

    setIsLoading(false);

    console.log("Search button clikced !");
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  const testRef = useClickOutSide(() => setIsPersonalModalOpen(false));

  const [hovered , setHovered] = useState<string | null>(null)

  return (
    <section className="absolute w-full max-w-[850px] rounded-[50px] bg-[#FFFFFF] top-20 grid grid-cols-[2fr_auto_auto_auto_auto_auto_2fr] items-center gap-2">
      <div className="py-[15px] px-8 rounded-[50px]  hover:bg-[#ece8e8] cursor-pointer" onMouseEnter={()=>setHovered("where")} onMouseLeave={()=>setHovered(null)}>Where <br/><span>Search destinations</span></div>
      <div className={`w-[2px] rounded-[5px] h-[40px] bg-[#EBEBEB] ${hovered === 'where' || hovered === 'checkIn' ? "opacity-0" : ""}`}></div>
      <div className="w-[150px] px-8 py-[15px] rounded-[50px]  hover:bg-[#ece8e8] cursor-pointer" onMouseEnter={()=>setHovered("checkIn")} onMouseLeave={()=>setHovered(null)}>Check in <br/><span>Add dates</span></div>
      <div className={`w-[2px] rounded-[5px] h-[40px] bg-[#EBEBEB] ${hovered === 'checkIn' || hovered === 'checkOut' ? 'opacity-0' : ""}`}></div>
      <div className="w-[150px] px-8 py-[15px] rounded-[50px]  hover:bg-[#ece8e8] cursor-pointer" onMouseEnter={()=>setHovered("checkOut")} onMouseLeave={()=>setHovered(null)}>Check out <br/><span>Add dates</span></div>
      <div className={`w-[2px] rounded-[5px] h-[40px] bg-[#EBEBEB] ${hovered === 'checkOut' || hovered === 'guests' ? "opacity-0" : ''}`}></div>
      <div className="py-[15px] px-8 rounded-[50px] hover:bg-[#ece8e8] cursor-pointer" onMouseEnter={()=>setHovered("guests")} onMouseLeave={()=>setHovered(null)}>Who <br/> <span>Add guests</span></div>
    </section>
  );
};

export default BookingBar;
