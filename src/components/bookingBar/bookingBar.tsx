import HotelIcon from "../../assets/svg/hotel.svg";
import AddPeople from "../../assets/svg/peopleAdd.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";

const BookingBar = () => {
  return (
    <div className="flex flex-row items-center w-fit rounded-[4px]">
      {/* where are you going */}
      <div className="pr-0 flex flex-row items-center gap-8 ">
        <img src={HotelIcon} alt="hotel"/>
        <p className="text-[12px] text-[#000] font-normal">
          Where Are You Going To?
        </p>
      </div>



      {/* DATE */}
      <div className="flex flex-row items-center gap-6">
        <img src={CalendarIcon} alt="person"/>
        <p className="text-[12px] text-[#000] font-normal">Check In Date</p>
        <p className="text-[12px] text-[#000] font-normal">Check Out Date</p>
      </div>


      {/* SEARCH */}
    <button className="p-[10px] bg-[#07689F] text-[#FFF] text-16">Search</button>
    </div>
  );
};

export default BookingBar;
