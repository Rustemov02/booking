import HotelIcon from "../../assets/svg/hotel.svg";
// import AddPeople from "../../assets/svg/peopleAdd.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";
import { DatePicker } from "rsuite";
import { useState } from "react";

const BookingBar = ({extraStyle } : {extraStyle?: string}) => {
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  return (
    <div className={`flex flex-row items-center w-fit rounded-[4px] border text-amber-500 overflow-hidden gap-2 bg-transparent ${extraStyle}`}>
      {/* where are you going */}
      <div className="pr-0 flex flex-row items-center gap-4 ">
        <img src={HotelIcon} alt="hotel" />
        <p className="text-[12px] text-[#000] font-normal">
          Where Are You Going To?
        </p>
      </div>
      <div className="w-[2px] bg-amber-500 h-[43px] border"/>
      {/* Check In Date */}
      <div
        className="flex flex-row items-center justify-between gap-6 relative w-auto cursor-pointer"
        onClick={() => setIsCheckInModalOpen(true)}
      >
        <img src={CalendarIcon} alt="person" />
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
          className="absolute top-2 right-full"
          style={{ visibility: "hidden" }}
        />
        <p className="text-[12px] text-[#000] font-normal">{`${
          checkInDate === null
            ? "Check In Date"
            : checkInDate?.toLocaleDateString("tr-TR")
        }`}</p>
      </div>
      <div className="w-[2px] bg-amber-500 h-[43px] border"/>
      {/* Check Out Date */}
      <div
        className="flex flex-row items-center justify-between gap-6 relative w-auto cursor-pointer"
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
          className="absolute top-4 left-0"
          style={{ visibility: "hidden" }}
        />
        <p className="text-[12px] text-[#000] font-normal">{`${
          checkOutDate === null
            ? "Check Out Date"
            : checkOutDate?.toLocaleDateString("tr-TR")
        }`}</p>
      </div> 
      {/* SEARCH */}
      <button className="p-[10px] bg-[#07689F]">
        <p className="text-[#FFF] text-[16px]">Search</p>
      </button>
    </div>
  );
};

export default BookingBar;
