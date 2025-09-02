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
import { motion } from "framer-motion";
import SelectionModal from "../modal/SelectionModal";

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

  const boxes = [
    {
      key: "where",
      label: "Where",
      sub: "Search destinations",
      width: 180, // optional: highlight ölçüsü üçün
    },
    {
      key: "checkIn",
      label: "Check in",
      sub: "Add dates",
      width: 200,
    },
    {
      key: "checkOut",
      label: "Check out",
      sub: "Add dates",
      width: 200,
    },
    {
      key: "guests",
      label: "Who",
      sub: "Add guests",
      width: 180,
    },
  ];

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

  const [hovered, setHovered] = useState<string | null>(null);
  const [isMainClicked, setMainClicked] = useState(false);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const clickedOutside = useClickOutSide(() => {
    setMainClicked(false);
    setSelectedBox(null);
  });

  const [guestsData, setGuestsData] = useState([
    {
      label: "Adults",
      title: "Ages 13 or above",
      count: 0,
    },
    {
      label: "Children",
      title: "Ages 2-12",
      count: 0,
    },
    {
      label: "Infants",
      title: "Under 2",
      count: 0,
    },
    {
      label: "Pets",
      title: "Bringing a service animal?",
      count: 0,
    },
  ]);

  useEffect(() => {
    console.log(guestsData);
  }),
    [guestsData];
  return (
    <section
      ref={clickedOutside}
      onClick={() => setMainClicked(selectedBox !== null)}
      className={`absolute w-full max-w-[850px] rounded-[50px] ${
        selectedBox !== null ? "bg-[#d4cece]" : "bg-[#FFFFFF]"
      } top-20 grid grid-cols-[2fr_auto_auto_auto_auto_auto_2fr] items-center gap-2 transition-all duration-600`}
    >
      {/* WHERE */}
      <div
        onClick={() => setSelectedBox("where")}
        className={`py-[15px] px-8 rounded-[50px] hover:bg-[#ece8e8] cursor-pointer duration-500 transform ${
          selectedBox === "where"
            ? "!bg-[#FFFFFF] border border-[#ddc2c2] shadow scale-103"
            : "border-none"
        }`}
        onMouseEnter={() => setHovered("where")}
        onMouseLeave={() => setHovered(null)}
      >
        {selectedBox === "where" && (
          <motion.div
            layoutId="highlight"
            className="absolute inset-0 rounded-[50px] bg-white shadow"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <div className="relative z-10">
          Where <br />
          <span>Search destinations</span>
        </div>
      </div>

      {/* LINE */}

      <div
        className={`w-[2px] rounded-[5px] h-[40px] bg-[#EBEBEB] duration-400 ${
          hovered === "where" ||
          hovered === "checkIn" ||
          selectedBox === "where" ||
          selectedBox === "checkIn"
            ? "opacity-0"
            : ""
        }`}
      ></div>
      {/* CHECK IN  */}
      <div
        onClick={() => setSelectedBox("checkIn")}
        className={`w-[150px] px-8 py-[15px] rounded-[50px]  hover:bg-[#ece8e8] cursor-pointer duration-500  ${
          selectedBox === "checkIn"
            ? "!bg-[#FFFFFF] border border-[#ddc2c2] shadow scale-103"
            : "border-none"
        }`}
        onMouseEnter={() => setHovered("checkIn")}
        onMouseLeave={() => setHovered(null)}
      >
        {selectedBox === "checkIn" && (
          <motion.div
            layoutId="highlight"
            className="absolute inset-0 rounded-[50px] bg-white shadow"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <div className="relative z-10">
          Check in <br />
          <span>Add dates</span>
        </div>
      </div>

      {/* LINE */}
      <div
        className={`w-[2px] rounded-[5px] h-[40px] bg-[#EBEBEB] ${
          hovered === "checkIn" ||
          hovered === "checkOut" ||
          selectedBox === "checkIn" ||
          selectedBox === "checkOut"
            ? "opacity-0"
            : ""
        }`}
      ></div>

      {/* CHECK OUT */}
      <div
        onClick={() => setSelectedBox("checkOut")}
        className={`w-[150px] px-8 py-[15px] rounded-[50px]  hover:bg-[#ece8e8] cursor-pointer duration-500 transform ${
          selectedBox === "checkOut"
            ? "!bg-[#FFFFFF] border border-[#ddc2c2] shadow scale-103 "
            : "border-none"
        }`}
        onMouseEnter={() => setHovered("checkOut")}
        onMouseLeave={() => setHovered(null)}
      >
        {selectedBox === "checkOut" && (
          <motion.div
            layoutId="highlight"
            className="absolute inset-0 rounded-[50px] bg-white shadow"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <div className="relative z-10">
          Check out <br />
          <span>Add dates</span>
        </div>
      </div>

      {/* LINE */}

      <div
        className={`w-[2px] rounded-[5px] h-[40px] bg-[#EBEBEB] ${
          hovered === "checkOut" ||
          hovered === "guests" ||
          selectedBox === "checkOut" ||
          selectedBox === "guests"
            ? "opacity-0"
            : ""
        }`}
      ></div>

      {/* GUESTS */}
      <div
        onClick={() => setSelectedBox("guests")}
        className={`py-[15px] px-8 rounded-[50px] hover:bg-[#ece8e8] cursor-pointer duration-500 transform ${
          selectedBox === "guests"
            ? "!bg-[#FFFFFF] border border-[#ddc2c2] shadow scale-103"
            : "border-none"
        }`}
        onMouseEnter={() => setHovered("guests")}
        onMouseLeave={() => setHovered(null)}
      >
        {selectedBox === "guests" && (
          <motion.div
            layoutId="highlight"
            className="absolute inset-0 rounded-[50px] bg-white shadow"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <div className="relative z-10">
          Who <br /> <span>Add guests</span>
        </div>
      </div>

      <div className="absolute top-full right-0 bg-white rounded-[20px] py-4 px-8 mt-2 w-[400px] h-auto ">
        {guestsData.map((item, index) => (
          <div className={`pt-3 pr-1 pl-0`}>
            <div className="flex items-center justify-between">
              <div>
                <p>{item.label}</p>
                <span>{item.title}</span>
              </div>
              <Counter
                count={item.count}
                onChange={(count) =>
                  setGuestsData((prev) =>
                    prev.map((g) =>
                      g.label === item.label ? { ...g, count } : g
                    )
                  )
                }
              />
            </div>
            {guestsData.length - 1 === index ? "" : <hr />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingBar;
