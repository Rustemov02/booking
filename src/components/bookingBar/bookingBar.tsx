import HotelIcon from "../../assets/svg/hotel.svg";
import peopleAdd from "../../assets/svg/peopleAdd.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";
import arrowDown from "../../assets/svg/arrow-down.svg";

import { DatePicker } from "rsuite";
import { useState } from "react";
import styles from "./bar.module.css";

const BookingBar = ({ extraStyle }: { extraStyle?: string }) => {
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [isPersonalModalOpen, setIsPersonalModalOpen] =
    useState<boolean>(false);


    const Counter = () => {
      return( 
        <div className="border rounded-sm">
          
        </div>
      )
    }
  return (
    <div className={`${styles.container} ${extraStyle}`}>
      {/* where are you going */}
      <div className="pr-0 pl-4 flex flex-row items-center gap-4 border-r-2 border-amber-500 ">
        <img src={HotelIcon} alt="hotel" />
        <p className="text-[12px] text-[#000] font-normal">
          Where Are You Going To?
        </p>
      </div>
      {/* Check In Date */}
      <div
        className="flex pl-4 border-r-2 border-amber-500 flex-row items-center justify-start gap-6 relative w-auto cursor-pointer"
        onClick={() => setIsCheckInModalOpen(true)}
      >
        <img src={CalendarIcon} alt="calendar" />
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
              setCheckInDate(date);
            }
          }}
          cleanable={false}
          className="absolute top-2"
          style={{ visibility: "hidden" }}
        />
        <p className="text-[12px] text-[#000] font-normal">{`${
          checkInDate === null
            ? "Check In Date"
            : checkInDate?.toLocaleDateString("tr-TR")
        }`}</p>
      </div>
      {/* Check Out Date */}
      <div
        className="flex flex-row pl-4 border-r-2 border-amber-500 items-center justify-start gap-6 relative w-auto cursor-pointer"
        onClick={() => setIsCheckOutModalOpen(true)}
      >
        <img src={CalendarIcon} alt="person" />
        <DatePicker
          open={isCheckOutModalOpen && !!checkInDate}
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
              setCheckOutDate(date);
            }
          }}
          cleanable={false}
          className="absolute top-2"
          style={{ visibility: "hidden" }}
        />
        <p className="text-[12px] text-[#000] font-normal">{`${
          checkOutDate === null
            ? "Check Out Date"
            : checkOutDate?.toLocaleDateString("tr-TR")
        }`}</p>
      </div>

      {/* Person count */}
      <div className="relative flex flex-row items-center justify-between px-4 gap-1">
        <img src={peopleAdd} alt="person" />
        <div className="flex flex-row items-end gap-4">
          <p className="text-[12px] text-[#000] font-normal">Adults</p>
          <p className="text-[12px] text-[#000] font-normal">Children</p>
          <p className="text-[12px] text-[#000] font-normal">Rooms</p>
        </div>
        <img
          src={arrowDown}
          alt="arrowDown"
          className="cursor-pointer"
          onClick={() => setIsPersonalModalOpen(!isPersonalModalOpen)}
        />
        <div
          className={`${
            isPersonalModalOpen ? "opacity-100 max-h-auto" : "opacity-0 h-0"
          } absolute top-12 right-0 p-4 bg-white rounded-sm transition-all duration-500 border w-full`}
        >
          <div><p>Yetişkin</p> </div>
        </div>
      </div>
      {/* SEARCH */}
      <button className="p-[10px] bg-[#07689F]">
        <p className="text-[#FFF] text-[16px]">Search</p>
      </button>
    </div>
  );
};

export default BookingBar;
