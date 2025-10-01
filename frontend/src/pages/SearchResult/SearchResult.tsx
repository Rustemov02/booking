import { useEffect, useState } from "react";
import BookingBar from "../../components/bookingBar/bookingBar";
import MarkFilter from "../../components/markFilter/MarkFilter";
import Card from "../../components/card/Card";
import { useSearchParams } from "react-router-dom";
import { BookingBarTypes } from "../../types";
import apiRequest from "../../api/apiRequest";
import toast from "react-hot-toast";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
  }, [searchParams]);

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

  // Filter Content Component (reusable for desktop and mobile)
  const FilterContent = () => (
    <>
      <h3 className="text-xl sm:text-2xl text-gray-700 font-bold mb-4">
        Filter by
      </h3>

      <p className="text-sm text-gray-900 font-normal mb-4">
        Your budget For Per Night
      </p>

      <div className="space-y-4">
        <MarkFilter
          title="Popular Filters"
          options={testData}
          selectedFilterItems={setSelectedItems}
        />

        <MarkFilter
          title="Room Facilities"
          options={roomFilterData}
          selectedFilterItems={setSelectedRooms}
        />

        <MarkFilter
          isCheckbox={false}
          title="Gusts Rating"
          options={gustsRating}
          selectedFilterItems={setSelectedRating}
        />

        <MarkFilter
          isCheckbox={false}
          title="Distance From The Centre"
          options={distanceFromCentre}
          selectedFilterItems={setSelectedDistance}
        />
      </div>
    </>
  );

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-6 sm:space-y-8 lg:space-y-10 mt-6 sm:mt-8 lg:mt-10">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-blue-600 font-semibold">
            Where Is Your Next Dream Place?
          </h1>
          <p className="text-sm sm:text-base text-blue-600">
            Find Exclusive Genius Rewards In Every Corner Of The World
          </p>
        </div>
        <BookingBar extraStyle="w-full" data={bookingBarData} />
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mt-6 mb-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium text-gray-900">Filters</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10 pb-10">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-4">
            <FilterContent />
          </div>
        </aside>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileFilters(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-[100]"
              />

              {/* Modal */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="lg:hidden fixed inset-y-0 left-0 w-[85%] sm:w-[400px] bg-white z-[101] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <FilterContent />
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors"
                  >
                    Show Results
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Results */}
        <main className="flex flex-col gap-4 sm:gap-6">
          {/* Results Count */}
          {filterData && filterData.length > 0 && (
            <p className="text-sm text-gray-600">
              {filterData.length} properties found
            </p>
          )}

          {/* Cards Grid */}
          {filterData && filterData.length > 0 ? (
            filterData.map((item: any, index: number) => (
              <Card key={item.id || index} data={item} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg text-gray-600 mb-2">No properties found</p>
              <p className="text-sm text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResult;
