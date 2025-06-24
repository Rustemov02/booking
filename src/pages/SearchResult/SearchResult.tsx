import BookingBar from "../../components/bookingBar/bookingBar";
import Card from "../../components/card/Card";

const SearchResult = () => {
  return (
    <div className={`container`}>
      {/* Header */}
      <div className="space-y-[40px] mt-[40px]">
        <div>
          <p className="text-[24px] text-[#07689F]">
            Where Is Your Next Dream Place?
          </p>
          <p className="text-[14px] !mt-[0px] text-[#07689F]">
            Find Exclusive Genius Rewards In Every Corner Of The World
          </p>
        </div>
        <BookingBar extraStyle="w-full" />
      </div>

      {/* Main */}
      <div className="grid grid-cols-[25%_auto] border mt-[40px] ">
        {/* Filter */}
        <div className='border flex flex-col'>
            <p className='text-[24px] text-[#565656] font-bold'>Filter by</p>

            <p className="text-[14px] text-[#000] font-normal">Your budget For Per Night</p>
        </div>
        {/* Result */}
        <div className='border flex flex-col'>
                Result Side
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
