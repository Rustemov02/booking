import HotelIcon from "../../assets/svg/hotel.svg";
import peopleAdd from "../../assets/svg/peopleAdd.svg";
import CalendarIcon from "../../assets/svg/calendar.svg?react";
import ArrowDown from "../../assets/svg/arrow-down.svg?react";
import { DatePicker } from "rsuite";
import { useState } from "react";
import styles from "./bar.module.css";
import Counter from "../counter/Counter";
import Switch from "../toggleSwitch/Switch";
import Close from "../../assets/svg/Close";
import { BookingBarTypes } from "../../types";
import toast from "react-hot-toast";
import useClickOutSide from "../../hooks/useClickOutside";
import { useNavigate, useRoutes } from "react-router-dom";

const BookingBar = ({ extraStyle }: { extraStyle?: string }) => {
  // structure
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [isPersonalModalOpen, setIsPersonalModalOpen] =
    useState<boolean>(false);

    const navigate = useNavigate()
   //data
  const [bookingData, setBookingData] = useState<BookingBarTypes>({
    checkIn: null,
    checkOut: null,
    adults: 1,
    children: 0,
    rooms: 1,
    withPet: false,
  });

  const clearCheckData = (type: "checkIn" | "checkOut") => {
    setBookingData((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  const handleSubmit = () => {

    navigate('searchResult')
    // if (!bookingData.checkIn || !bookingData.checkOut) { 
    //  return toast.error("Bütün məlumatları daxil edin !")
    // };

  };  
  const testRef = useClickOutSide(()=>setIsPersonalModalOpen(false))
  return (
    <div
      className={`hidden lg:flex md-2:flex flex-row items-center flex-wrap w-4/5 border border-[#A6A6A6] bg-white rounded-[4px] ${extraStyle}`}
    >
      {/* where are you going */}
      <div className={`${styles.item}`}>
        <img src={HotelIcon} alt="hotel" />
        <p className="text-[12px] text-[#000] font-normal">
          Where Are You Going To?
        </p>
      </div>
      {/* Check In Date */}
      <div
        className={`flex flex-row items-baseline justify-between ${styles.item}`}
      >
        <div
          className={`flex items-center justify-between gap-6 relative cursor-pointer `}
          onClick={() => {
            if (!isCheckInModalOpen) {
              setIsCheckInModalOpen(true);
            }
          }}
        >
          <CalendarIcon />
          <DatePicker
            open={isCheckInModalOpen}
            onClose={() => setIsCheckInModalOpen(false)}
            oneTap
            shouldDisableDate={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            toggleAs="div"
            placeholder="Check in Date"
            onChange={(date: Date | null) => {
              if (date) {
                setBookingData((prev) => ({
                  ...prev,
                  checkIn: date.toISOString().split("T")[0],
                }));
                setIsCheckInModalOpen(false);
              }
            }}
            cleanable={false}
            className="absolute top-2"
            style={{ visibility: "hidden" }}
          />
          <span className="text-[12px] text-[#000] font-normal">{`${
            bookingData?.checkIn || "Check In Date"
          }`}</span>
        </div>
        {bookingData.checkIn && (
          <span
            className="cursor-pointer"
            onClick={() => clearCheckData("checkIn")}
          >
            <Close size={18} />
          </span>
        )}
      </div>
      {/* Check Out Date */}
      <div
        className={`flex flex-row items-baseline justify-between ${styles.item}`}
      >
        <div
          className={`flex items-center justify-start gap-6 relative cursor-pointer`}
          onClick={() => {
            if (!isCheckOutModalOpen) {
              setIsCheckOutModalOpen(true);
            }
          }}
        >
          <CalendarIcon />
          <DatePicker
            open={isCheckOutModalOpen}
            onClose={() => setIsCheckOutModalOpen(false)}
            oneTap
            shouldDisableDate={(date: Date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
              (checkInDate !== null && date < checkInDate)
            }
            toggleAs="div"
            placeholder="Check out Date"
            onChange={(date: Date | null) => {
              if (date) {
                setBookingData((prev) => ({
                  ...prev,
                  checkOut: date.toISOString().split("T")[0],
                }));
              }
            }}
            cleanable={false}
            className="absolute top-2"
            style={{ visibility: "hidden" }}
          />
          <p className="text-[12px] text-[#000] font-normal">{`${
            bookingData?.checkOut || "Check Out Date"
          }`}</p>
        </div>
        {bookingData?.checkOut && (
          <span
            className="cursor-pointer"
            onClick={() => clearCheckData("checkOut")}
          >
            <Close size={18} />
          </span>
        )}
      </div>
      {/* Person count */}
      <div 
      ref={testRef}
        className={`relative  justify-between gap-1 ${styles.item} !border-none`}
      >
        <img src={peopleAdd} alt="person" />
        <div className="flex flex-row items-end gap-4">
          <p className="text-[12px] text-[#000] font-normal">Adults</p>
          <p className="text-[12px] text-[#000] font-normal">Children</p>
          <p className="text-[12px] text-[#000] font-normal">Rooms</p>
        </div>
        <span>
          <ArrowDown
            className={`cursor-pointer transition-transform duration-300 ${
              isPersonalModalOpen ? "rotate-x-180 " : "rotate-x-0"
            }`}
            onClick={() => setIsPersonalModalOpen(prev => !prev)}
          />
        </span> 
        {/*  --- Personal Modal ---  */}
        <div   
          className={`${
            isPersonalModalOpen
              ? "opacity-100 max-h-auto overflow-auto p-4"
              : "opacity-0 max-h-0 overflow-hidden p-0"
          } absolute top-16 right-0 space-y-2 bg-white rounded-sm transition-all duration-500 border w-full`}
        >
          <div className="flex flex-row items-center justify-between gap-4">
            <p>Adults</p>{" "}
            <Counter count={bookingData.adults} onChange={() => {}} />
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <p>Children</p>{" "}
            <Counter count={bookingData.children} onChange={() => {}} />
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <p>Rooms</p>{" "}
            <Counter count={bookingData.rooms} onChange={() => {}} />
          </div>
          <hr />
          {/* traveling with pets */}
          <div className="flex flex-row items-center justify-between">
            <p className="w-4/5">Are you traveling with a pet?</p>{" "}
            <Switch
              onChange={(isActive) =>
                setBookingData((prev) => ({ ...prev, withPet: isActive }))
              }
            />
          </div>
        </div>
      </div>
      {/* SEARCH */}
      <button className={`${styles.searchBtn} `} onClick={handleSubmit}>
        <p className={`text-[#FFF] text-[16px] ${styles.searchBtn}`}>Search</p>
      </button>
    </div>
  );
};

export default BookingBar;
