import { useEffect, useState } from "react";
import BookingBar from "../../components/bookingBar/bookingBar";
import MarkFilter from "../../components/markFilter/MarkFilter";

const SearchResult = () => {
  const testData = [
    "Breakfast included",
    "All-inclusive",
    "Free-cancellation",
    "Testing",
    "Text",
    "Writet",
    "Pet Friendly",
  ];

  const roomFilterData = [
    "Own Bathroom",
    "Kitchen",
    "See view",
    "Baby bed",
    "Bathtub",
  ];

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
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
        <div className="border flex flex-col gap-[16px]">
          <p className="text-[24px] text-[#565656] font-bold">Filter by</p>

          <p className="text-[14px] text-[#000] font-normal">
            Your budget For Per Night
          </p>

          <div>
            <MarkFilter
              title="Popular Filters"
              options={testData}
              selectedFilterItems={setSelectedItems}
            />
          </div>

          <div>
            <MarkFilter
              title="Room Facilities"
              options={roomFilterData}
              selectedFilterItems={setSelectedRooms}
            />
          </div>
        </div>
        {/* Result */}
        <div className="border flex flex-col">Result Side</div>
      </div>
    </div>
  );
};

export default SearchResult;
