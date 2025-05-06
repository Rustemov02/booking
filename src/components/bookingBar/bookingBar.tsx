import HotelIcon from "../../assets/svg/hotel.svg";
import peopleAdd from "../../assets/svg/peopleAdd.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";
import ArrowDown from "../../assets/svg/arrow-down.svg?react";
import { DatePicker } from "rsuite";
import { useState } from "react";
import styles from "./bar.module.css";
import Counter from "../counter/Counter";
import Switch from "../toggleSwitch/Switch";

const BookingBar = ({ extraStyle }: { extraStyle?: string }) => {
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [isPersonalModalOpen, setIsPersonalModalOpen] =
    useState<boolean>(false);

  return (
    <div className={`hidden lg:flex md-2:flex flex-row items-center flex-wrap w-4/5 border border-[#A6A6A6] bg-white rounded-[4px] ${extraStyle}`}>
      {/* where are you going */}
      <div className={`${styles.item}`}>
        <img src={HotelIcon} alt="hotel" />
        <p className="text-[12px] text-[#000] font-normal">
          Where Are You Going To?
        </p>
      </div>
      {/* Check In Date */}
      <div
        className={`justify-start gap-6 relative cursor-pointer ${styles.item}`}
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
        className={`justify-start gap-6 relative cursor-pointer ${styles.item}`}
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
      <div className={`relative  justify-between gap-1 ${styles.item} !border-none`}>
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
            onClick={() => setIsPersonalModalOpen(!isPersonalModalOpen)}
          />
        </span>
        {/*  --- Modal ---  */}
        <div
          className={`${
            isPersonalModalOpen
              ? "opacity-100 max-h-auto overflow-auto"
              : "opacity-0 h-0 overflow-hidden"
          } absolute top-12 right-0 p-4 space-y-2 bg-white rounded-sm transition-all duration-500 border w-auto`}
        >
          <div className="flex flex-row items-center justify-between gap-4">
            <p>Adults</p> <Counter count={0} onChange={() => {}} />
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <p>Children</p> <Counter count={0} onChange={() => {}} />
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <p>Rooms</p> <Counter count={0} onChange={() => {}} />
          </div>
          <hr />
          {/* traveling with pets */}
          <div className="flex flex-row items-center justify-between">
            <p>Are you traveling with a pet?</p> <Switch onChange={() => {}} />
          </div>
        </div>
      </div>
      {/* SEARCH */}
      <button className={`${styles.searchBtn} `}>
        <p className={`text-[#FFF] text-[16px] ${styles.searchBtn}`}>Search</p>
      </button>
    </div>
  );
};

export default BookingBar;
