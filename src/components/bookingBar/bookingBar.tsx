import HotelIcon from "../../assets/svg/hotel.svg";
import peopleAdd from "../../assets/svg/peopleAdd.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";
import arrowDown from "../../assets/svg/arrow-down.svg";
import IncreaseIcon from "../../assets/svg/add.svg?react";
import DecreaseIcon from "../../assets/svg/remove.svg?react";
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

  const Counter = ({
    count,
    onChange,
  }: {
    count: number;
    onChange: (value: number) => void;
  }) => {
    const [currentNumb, setCurrentNumb] = useState<number>(count || 0);

    const handleDecrease = () => {
      const newValue = currentNumb - 1;
      setCurrentNumb(newValue);
      onChange(newValue);
    };

    const handleIncrease = () => {
      const newValue = currentNumb + 1;
      setCurrentNumb(newValue);
      onChange(newValue);
    };

    return (
      <div className="flex flex-row items-center justify-between border w-full max-w-25 rounded-sm py-2 px-1 bg-white ">
        <DecreaseIcon onClick={handleDecrease} className="cursor-pointer" />
        <span>{currentNumb}</span>
        <IncreaseIcon onClick={handleIncrease} className="cursor-pointer" />
      </div>
    );
  };

  const [adultsNumber, setAdultsNumber] = useState(0);
  const [toggle, setToggle] = useState(false);
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
            isPersonalModalOpen ? "opacity-100 max-h-auto overflow-auto" : "opacity-0 h-0 overflow-hidden"
          } absolute top-12 right-0 p-4 space-y-2 bg-white rounded-sm transition-all duration-500 border w-full`}
        >
          <div className="flex flex-row items-center justify-between gap-4">
            <p>Adults</p>{" "}
            <Counter count={adultsNumber} onChange={setAdultsNumber} />
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <p>Children</p> <Counter count={0} onChange={() => {}} />
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <p>Rooms</p> <Counter count={0} onChange={() => {}} />
          </div>
          <hr />
          {/* traveling üith pets */}
          <div className="flex flex-row items-center justify-between">
            <p>Are you traveling with a pet?</p>{" "}
            <div
              // UPDATE: you can use here twMerge
              onClick={() => setToggle(!toggle)}
              className={`w-[35px] h-[24px] flex items-center ${
                toggle ? "justify-end bg-blue-700" : "justify-start bg-gray-600"
              } transition-all duration-500  rounded-xl cursor-pointer`}
            >
              <div
                className="w-[24px] h-[24px] border bg-[#ffffff] rounded-full transform transition-transform duration-500"
                style={{
                  transform: toggle ? "translateX(3px)" : "translateX(-2px)",
                  borderColor: toggle ? "#1447e6" : "#4a5565",
                }}
              ></div>
            </div>
          </div>
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
