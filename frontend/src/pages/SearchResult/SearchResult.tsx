import { useEffect, useState } from "react";
import BookingBar from "../../components/bookingBar/bookingBar";
import MarkFilter from "../../components/markFilter/MarkFilter";
import Card from "../../components/card/Card";
import { useSearchParams } from "react-router-dom";
import { BookingBarTypes, CardTypes } from "../../types";
import apiRequest from "../../api/apiRequest";
import toast from "react-hot-toast";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [filterData, setFilterData] = useState([]);

  const params = Object.fromEntries(searchParams.entries());

  const bookingBarData: BookingBarTypes = {
    checkIn: params.checkIn || null,
    checkOut: params.checkOut || null,
    adults: params.adults ? Number(params.adults) : 1,
    children: params.children ? Number(params.children) : 0,
    rooms: params.rooms ? Number(params.rooms) : 1,
    petFriendly: params.petFriendly === "true",
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    const searchResult = async () => {
      try {
        const response = await apiRequest({
          method: "POST",
          url: "/api/rooms/search",
          data: bookingBarData,
          onError: (err) => {
            setError(err?.response?.data?.error);
          },
        });

        if (!response) {
          toast.error("Xəta baş verdi");
        }
        setFilterData(response?.rooms);
      } catch (err) {
        console.log("ERROR :", err);
      }
    };

    searchResult();
  }, []);

  useEffect(() => {
    console.log(filterData);
  }, [filterData]);
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

  const gustsRating = [
    "All",
    "Outstanding 9+",
    "Very good 8+",
    "Good 7+",
    "Excelent",
    "Poor",
  ];

  const distanceFromCentre = [
    "Less Than 1 km",
    "Less Than 5 km",
    "Less Than 15 km",
  ];

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState<string[]>([]);

  const personCount = { adult: 1, children: 2 };

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
        <BookingBar extraStyle="w-full" data={bookingBarData} />
      </div>

      {/* Main */}
      <div className="grid grid-cols-[25%_auto] mt-[40px] ">
        {/* Filter */}
        <div className="flex flex-col gap-[16px]">
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

          <div>
            <MarkFilter
              isCheckbox={false}
              title="Gusts Rating"
              options={gustsRating}
              selectedFilterItems={setSelectedRating}
            />
          </div>

          <div>
            <MarkFilter
              isCheckbox={false}
              title="Distance From The Centre"
              options={distanceFromCentre}
              selectedFilterItems={setSelectedDistance}
            />
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col gap-6">
          {filterData &&
            filterData.map((item: any) => (
              <Card
                // onClick={handleRequest}
                id={item.id}
                price={item.pricePerNight}
                // basePath={routes.destinationDetail}
                title={item.name}
                text={item.description}
                rating={3.2}
                desc={item.cancellationPolicy}
                isSaved={item.isSaved}
                // setIsSaved={() => handleSetRoomsData(item.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
