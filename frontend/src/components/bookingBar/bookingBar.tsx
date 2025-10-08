import { useEffect, useState } from "react";
import Counter from "../counter/Counter";
import { BookingBarTypes } from "../../types";
import toast from "react-hot-toast";
import useClickOutSide from "../../hooks/useClickOutside";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Search } from "lucide-react";

const BookingBar = ({
  data,
}: {
  extraStyle?: string;
  data?: BookingBarTypes;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});

  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingBarTypes>(
    data || {
      checkIn: null,
      checkOut: null,
      adults: 1,
      children: 0,
      rooms: 1,
      petFriendly: false,
    }
  );

  // Mobile modal state
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileStep, setMobileStep] = useState<"where" | "dates" | "guests">(
    "where"
  );

  const clearCheckData = (type: "checkIn" | "checkOut") => {
    setBookingData((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    const queryParams = Object.entries(bookingData).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>
    );
    const params = new URLSearchParams(queryParams);

    const currentPath = location.pathname;
    const basePath = currentPath.includes("searchResult") ? "" : "searchResult";

    navigate(`${basePath}?${params}`);
    setIsLoading(false);
    setShowMobileModal(false);

    console.log("Search button clicked!");
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const [hovered, setHovered] = useState<string | null>(null);
  const [isMainClicked, setMainClicked] = useState(false);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const clickedOutside = useClickOutSide(() => {
    setMainClicked(false);
    setSelectedBox(null);
  });

  const [guestsData, setGuestsData] = useState([
    {
      label: "Adults",
      title: "Ages 13 or above",
      count: 0,
    },
    {
      label: "Children",
      title: "Ages 2-12",
      count: 0,
    },
    {
      label: "Infants",
      title: "Under 2",
      count: 0,
    },
    {
      label: "Pets",
      title: "Bringing a service animal?",
      count: 0,
    },
  ]);

  const commonContainerStyles =
    "py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-full border-none hover:bg-gray-100 cursor-pointer transition-all duration-300";

  const hoveringStyles = "!bg-white shadow-lg scale-105";

  return (
    <section className="w-full flex items-center justify-center px-4">
      {/* DESKTOP VERSION */}
      <div
        ref={clickedOutside}
        onClick={() => setMainClicked(selectedBox !== null)}
        className={`mx-auto relative hidden md:grid max-w-[850px] rounded-full w-full ${
          selectedBox !== null ? "bg-gray-200" : "bg-white shadow-lg"
        } grid-cols-[2fr_auto_150px_auto_150px_auto_1fr_50px] items-center gap-1 transition-all duration-500`}
      >
        {/* WHERE */}
        <div
          onClick={() => setSelectedBox("where")}
          className={`${commonContainerStyles} ${
            selectedBox === "where" ? hoveringStyles : ""
          }`}
          onMouseEnter={() => setHovered("where")}
          onMouseLeave={() => setHovered(null)}
        >
          {selectedBox === "where" && (
            <motion.div
              layoutId="highlight"
              className="absolute inset-0 rounded-full bg-white shadow-lg"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative z-10">
            <p className="text-xs font-semibold text-gray-900">Where</p>
            <p className="text-sm text-gray-500">Search destinations</p>
          </div>
        </div>

        <AnimatePresence>
          {selectedBox === "where" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 bg-white rounded-3xl py-6 px-8 mt-3 w-[400px] shadow-2xl z-50"
            >
              <p className="text-sm font-medium text-gray-700">
                Suggested Destinations
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DIVIDER */}
        <div
          className={`w-[1px] h-8 bg-gray-200 transition-opacity duration-300 ${
            hovered === "where" ||
            hovered === "checkIn" ||
            selectedBox === "where" ||
            selectedBox === "checkIn"
              ? "opacity-0"
              : ""
          }`}
        />

        {/* CHECK IN */}
        <div
          onClick={() => setSelectedBox("checkIn")}
          className={`${commonContainerStyles} ${
            selectedBox === "checkIn" ? hoveringStyles : ""
          }`}
          onMouseEnter={() => setHovered("checkIn")}
          onMouseLeave={() => setHovered(null)}
        >
          {selectedBox === "checkIn" && (
            <motion.div
              layoutId="highlight"
              className="absolute inset-0 rounded-full bg-white shadow-lg"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative z-10">
            <p className="text-xs font-semibold text-gray-900">Check in</p>
            <p className="text-sm text-gray-500">Add dates</p>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          className={`w-[1px] h-8 bg-gray-200 transition-opacity duration-300 ${
            hovered === "checkIn" ||
            hovered === "checkOut" ||
            selectedBox === "checkIn" ||
            selectedBox === "checkOut"
              ? "opacity-0"
              : ""
          }`}
        />

        {/* CHECK OUT */}
        <div
          onClick={() => setSelectedBox("checkOut")}
          className={`${commonContainerStyles} ${
            selectedBox === "checkOut" ? hoveringStyles : ""
          }`}
          onMouseEnter={() => setHovered("checkOut")}
          onMouseLeave={() => setHovered(null)}
        >
          {selectedBox === "checkOut" && (
            <motion.div
              layoutId="highlight"
              className="absolute inset-0 rounded-full bg-white shadow-lg"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative z-10">
            <p className="text-xs font-semibold text-gray-900">Check out</p>
            <p className="text-sm text-gray-500">Add dates</p>
          </div>
        </div>

        <AnimatePresence>
          {(selectedBox === "checkIn" || selectedBox === "checkOut") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-[8%] bg-white rounded-3xl py-6 px-8 mt-3 w-max shadow-2xl z-50"
            >
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
                pagedNavigation
                modifiersClassNames={{
                  selected: "!bg-gray-900 text-white rounded-full",
                  range_start: "bg-blue-600 text-white rounded-l-full",
                  range_end: "!bg-gray-900 text-white rounded-r-full",
                  range_middle: "!bg-gray-100 !text-gray-900",
                  today: "!rounded-full !text-blue-600 font-bold",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* DIVIDER */}
        <div
          className={`w-[1px] h-8 bg-gray-200 transition-opacity duration-300 ${
            hovered === "checkOut" ||
            hovered === "guests" ||
            selectedBox === "checkOut" ||
            selectedBox === "guests"
              ? "opacity-0"
              : ""
          }`}
        />

        {/* GUESTS */}
        <div
          onClick={() => setSelectedBox("guests")}
          className={`${commonContainerStyles} ${
            selectedBox === "guests" ? hoveringStyles : ""
          }`}
          onMouseEnter={() => setHovered("guests")}
          onMouseLeave={() => setHovered(null)}
        >
          {selectedBox === "guests" && (
            <motion.div
              layoutId="highlight"
              className="absolute inset-0 rounded-full bg-white shadow-lg"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative z-10">
            <p className="text-xs font-semibold text-gray-900">Who</p>
            <p className="text-sm text-gray-500">Add guests</p>
          </div>
        </div>

        <AnimatePresence>
          {selectedBox === "guests" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 bg-white rounded-3xl py-6 px-8 mt-3 w-[400px] shadow-2xl z-50"
            >
              {guestsData.map((item, index) => (
                <div key={item.label} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500">{item.title}</p>
                    </div>
                    <Counter
                      count={item.count}
                      onChange={(count) =>
                        setGuestsData((prev) =>
                          prev.map((g) =>
                            g.label === item.label ? { ...g, count } : g
                          )
                        )
                      }
                    />
                  </div>
                  {guestsData.length - 1 !== index && (
                    <hr className="mt-4 border-gray-200" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="absolute right-2 text-white p-3 rounded-full 
          transition-all duration-300 scale-140 hover:scale-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* MOBILE VERSION */}
      <div className="md:hidden w-full max-w-md">
        <button
          onClick={() => setShowMobileModal(true)}
          className="flex items-center justify-between w-full rounded-full bg-white shadow-lg border border-gray-200 py-3 px-5 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-900 font-semibold">
              Start your search
            </p>
          </div>
        </button>

        {/* Mobile Modal */}
        <AnimatePresence>
          {showMobileModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileModal(false)}
                className="fixed inset-0 bg-black/50 z-[100]"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-[101] max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Search
                  </h2>
                  <button
                    onClick={() => setShowMobileModal(false)}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Where Section */}
                  <div className="border border-gray-300 rounded-2xl p-4">
                    <label className="text-xs font-semibold text-gray-900 block mb-1">
                      Where
                    </label>
                    <input
                      type="text"
                      placeholder="Search destinations"
                      className="w-full text-sm text-gray-600 outline-none"
                    />
                  </div>

                  {/* Dates Section */}
                  <div className="border border-gray-300 rounded-2xl p-4">
                    <label className="text-xs font-semibold text-gray-900 block mb-2">
                      When
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Check in</p>
                        <button
                          onClick={() => setMobileStep("dates")}
                          className="text-sm text-gray-900 hover:underline"
                        >
                          Add dates
                        </button>
                      </div>
                      <div className="w-[1px] bg-gray-300" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Check out</p>
                        <button
                          onClick={() => setMobileStep("dates")}
                          className="text-sm text-gray-900 hover:underline"
                        >
                          Add dates
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Calendar for Mobile */}
                  {mobileStep === "dates" && (
                    <div className="border border-gray-300 rounded-2xl p-4">
                      <DayPicker
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        numberOfMonths={1}
                        modifiersClassNames={{
                          selected: "!bg-gray-900 text-white rounded-full",
                          range_start: "bg-blue-600 text-white rounded-l-full",
                          range_end: "!bg-gray-900 text-white rounded-r-full",
                          range_middle: "!bg-gray-100 !text-gray-900",
                          today: "!rounded-full !text-blue-600 font-bold",
                        }}
                      />
                    </div>
                  )}

                  {/* Guests Section */}
                  <div className="border border-gray-300 rounded-2xl p-4">
                    <label className="text-xs font-semibold text-gray-900 block mb-3">
                      Who
                    </label>
                    {guestsData.map((item, index) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {item.label}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.title}
                            </p>
                          </div>
                          <Counter
                            count={item.count}
                            onChange={(count) =>
                              setGuestsData((prev) =>
                                prev.map((g) =>
                                  g.label === item.label ? { ...g, count } : g
                                )
                              )
                            }
                          />
                        </div>
                        {guestsData.length - 1 !== index && (
                          <hr className="border-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Search Button */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BookingBar;
