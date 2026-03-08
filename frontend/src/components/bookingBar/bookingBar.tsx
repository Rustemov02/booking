import { useEffect, useState } from "react";
import Counter from "../counter/Counter";
import { BookingBarTypes } from "../../types";
import toast from "react-hot-toast";
import useClickOutSide from "../../hooks/useClickOutside";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronRight, MapPin, Search } from "lucide-react";

import { useTranslation } from "react-i18next";

const BookingBar = ({
  data,
}: {
  extraStyle?: string;
  data?: BookingBarTypes;
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingBarTypes>(
    data || {
      destination: null,
      checkIn: null,
      checkOut: null,
      rooms: 1,
      guests: [
        {
          label: "rooms",
          title: "roomsTitle",
          count: 0,
        },
        {
          label: "adults",
          title: "adultsTitle",
          count: 0,
        },
        {
          label: "children",
          title: "childrenTitle",
          count: 0,
        },
        {
          label: "pets",
          title: "petsTitle",
          count: 0,
        },
      ],
    }
  );

  // Mobile modal state
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileStep, setMobileStep] = useState<"where" | "dates" | "guests">(
    "where"
  );

  useEffect(() => {
    console.log("BOOKING DATA : ", bookingData);
  }, [bookingData]);

  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const clickedOutside = useClickOutSide(() => {
    setSelectedBox(null);
  });

  // const [guestsData, setGuestsData] = useState([
  //   {
  //     label: "Adults",
  //     title: "Ages 13 or above",
  //     count: 0,
  //   },
  //   {
  //     label: "Children",
  //     title: "Ages 2-12",
  //     count: 0,
  //   },
  //   {
  //     label: "Pets",
  //     title: "Bringing a service animal?",
  //     count: 0,
  //   },
  // ]);
  const handleSubmit = async () => {
    setSelectedBox("");
    const [, adultsCount, childrenCount] = bookingData.guests.map((g) => g.count);

    if (!bookingData.destination) {
      toast.error(t("validation.selectDestination"));
      return;
    }

    if (!bookingData.checkIn || !bookingData.checkOut) {
      toast.error(t("validation.selectDates"));
      return;
    }

    if (adultsCount + childrenCount === 0) {
      toast.error(t("validation.selectGuests"));
      return;
    }
    setIsLoading(true);

    const { checkIn, checkOut, guests, destination } = bookingData;
    const [rooms, adults, children, pets] = guests.map((g) => g.count);

    const queryParams = {
      destination,
      adults,
      children,
      rooms,
      pets,
      checkIn,
      checkOut,
    };

    console.log(queryParams);
    const params = new URLSearchParams(queryParams as any);

    const currentPath = location.pathname;
    const basePath = currentPath.includes("searchResult") ? "" : "searchResult";

    setIsLoading(false);
    navigate(`${basePath}?${params}`);
    setShowMobileModal(false);
  };

  const commonContainerStyles =
    "py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-full border-none hover:bg-gray-100 cursor-pointer transition-all duration-300";

  const hoveringStyles = "!bg-white shadow-lg scale-105";

  const destinations: any = [
    {
      name: "Azerbaijan",
      cities: ["Baku", "Qabala", "Qusar", "Zagatala", "Sheki"],
    },
  ];

  const [destinationSelectOpen, setDestinationSelectOpen] = useState(false);

  useEffect(() => {
    if (selectedBox !== "where") setDestinationSelectOpen(false);
  }, [selectedBox]);

  return (
    <section className="w-full flex items-center justify-center px-4">
      {/* DESKTOP VERSION */}
      <div
        ref={clickedOutside}
        onClick={() => { }}
        className={`mx-auto relative hidden md:grid max-w-[900px] rounded-full w-full ${selectedBox !== null ? "bg-white shadow-xl ring-1 ring-black/5" : "bg-white shadow-lg"
          } grid-cols-[1.5fr_auto_1fr_auto_1fr_auto_1fr_60px] items-center transition-all duration-500`}
      >
        {/* WHERE */}
        <div
          onClick={() => setSelectedBox("where")}
          className={`${commonContainerStyles} ${selectedBox === "where" ? hoveringStyles : ""
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
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-900">{t("bookingBar.where")}</p>
              <p className="text-sm text-gray-500">
                {bookingData?.destination ?? t("bookingBar.searchDestinations")}
              </p>
            </div>
            {bookingData?.destination && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBookingData((prev) => ({
                    ...prev,
                    destination: null,
                  }));
                }}
                className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
                aria-label="Clear destination"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {selectedBox === "where" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 bg-white rounded-3xl w-[400px] h-auto shadow-2xl z-50"
            >
              {/* <div className="relative">
                <Input className="pl-10 pr-4 h-12 bg-white border-neutral-200 rounded-xl focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-transparent transition-all" />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              </div> */}

              <div className="absolute top-full left-0 w-[400px] oveflow-hidden mt-4 bg-white rounded-2xl   shadow-lg border border-neutral-200">
                <div className="max-h-[400px] overflow-y-auto">
                  <div className="px-4 py-3 border-b border-neutral-100">
                    <h4 className="text-neutral-900">{t("bookingBar.suggestedDestinations")}</h4>
                  </div>

                  <div className="py-2">
                    {destinations.map(
                      (country: { name: string; cities: string[] }) => (
                        <div key={country.name} className="mb-1">
                          {/* Country Header */}
                          <button
                            onClick={() =>
                              setDestinationSelectOpen(!destinationSelectOpen)
                            }
                            className="w-full flex items-center  cursor-pointer justify-between px-4 py-2.5 hover:bg-neutral-50 transition-colors group"
                          >
                            <div className="flex items-center gap-3 ">
                              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-teal-600" />
                              </div>
                              <span className="text-neutral-900">
                                {country.name}
                              </span>
                            </div>
                            <motion.div
                              transition={{ duration: 0.2 }}
                              animate={{
                                rotate: destinationSelectOpen ? 90 : 0,
                              }}
                            >
                              <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600" />
                            </motion.div>
                          </button>

                          {/* Cities List */}
                          <AnimatePresence>
                            {destinationSelectOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 pl-8 border-l-2 border-neutral-100">
                                  {country.cities.map((city: string) => (
                                    <button
                                      key={city}
                                      onClick={() => {
                                        setBookingData((prev) => ({
                                          ...prev,
                                          destination: `${city}, ${country.name}`,
                                        }));
                                        setSelectedBox(null);
                                      }}
                                      className="cursor-pointer w-full text-left px-4 py-2 hover:bg-teal-50 transition-colors rounded-lg text-neutral-700 hover:text-teal-700 my-0.5"
                                    >
                                      {city}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DIVIDER */}
        <div
          className={`w-[1px] h-8 bg-gray-200 transition-opacity duration-300 ${hovered === "where" ||
            hovered === "checkIn" ||
            selectedBox === "where" ||
            selectedBox === "checkIn"
            ? "opacity-0"
            : ""
            }`}
        />

        {/* CHECK IN */}
        <div
          onClick={() => setSelectedBox("dates")}
          className={`${commonContainerStyles} ${selectedBox === "dates" ? hoveringStyles : ""
            }`}
          onMouseEnter={() => setHovered("checkIn")}
          onMouseLeave={() => setHovered(null)}
        >
          {selectedBox === "dates" && (
            <motion.div
              layoutId="highlight"
              className="absolute inset-0 rounded-l-full bg-white shadow-lg"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900">{t("bookingBar.checkIn")}</p>
              <p className="text-sm text-gray-500">
                {bookingData?.checkIn ? String(bookingData.checkIn) : t("bookingBar.addDates")}
              </p>
            </div>
            {bookingData?.checkIn && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBookingData((prev) => ({
                    ...prev,
                    checkIn: null,
                  }));
                }}
                className="text-gray-400 hover:text-red-500 transition-colors text-sm leading-none flex-shrink-0 w-4 h-4 flex items-center justify-center"
                aria-label="Clear check-in"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <div
          className={`w-[1px] h-8 bg-gray-200 transition-opacity duration-300 ${hovered === "checkIn" ||
            hovered === "checkOut" ||
            selectedBox === "dates"
            ? "opacity-0"
            : ""
            }`}
        />

        {/* CHECK OUT */}
        <div
          onClick={() => setSelectedBox("dates")}
          className={`${commonContainerStyles} ${selectedBox === "dates" ? hoveringStyles : ""
            }`}
          onMouseEnter={() => setHovered("checkOut")}
          onMouseLeave={() => setHovered(null)}
        >
          {selectedBox === "dates" && (
            <motion.div
              layoutId="highlight-checkout"
              className="absolute inset-0 rounded-r-full bg-white shadow-lg"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900">{t("bookingBar.checkOut")}</p>
              <p className="text-sm text-gray-500">
                {bookingData?.checkOut ? String(bookingData.checkOut) : t("bookingBar.addDates")}
              </p>
            </div>
            {bookingData?.checkOut && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBookingData((prev) => ({
                    ...prev,
                    checkOut: null,
                  }));
                }}
                className="text-gray-400 hover:text-red-500 transition-colors text-sm leading-none flex-shrink-0 w-4 h-4 flex items-center justify-center"
                aria-label="Clear check-out"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {selectedBox === "dates" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-[8%] bg-white rounded-3xl py-6 px-8 mt-3 w-max shadow-2xl"
            >
              <DayPicker
                mode="range"
                selected={{
                  from: bookingData?.checkIn
                    ? new Date(bookingData.checkIn)
                    : undefined,
                  to: bookingData?.checkOut
                    ? new Date(bookingData.checkOut)
                    : undefined,
                }}
                onSelect={(date) => {
                  console.log(date);
                  setBookingData((prev: any) => ({
                    ...prev,
                    checkIn:
                      typeof date?.from !== "string"
                        ? date?.from?.toLocaleDateString("en-CA")
                        : date?.from,
                    checkOut:
                      typeof date?.to !== "string"
                        ? date?.to?.toLocaleDateString("en-CA")
                        : date?.to,
                  }));
                }}
                numberOfMonths={2}
                pagedNavigation
                disabled={{ before: new Date() }}
                modifiersClassNames={{
                  selected:
                    "!bg-emerald-500 text-white rounded-full font-medium",
                  range_start:
                    "!bg-teal-500 text-white rounded-l-full font-medium shadow-md",
                  range_end:
                    "!bg-emerald-500 text-white rounded-r-full font-medium shadow-md",
                  range_middle: "!bg-emerald-50 !text-emerald-900",
                  today:
                    "!rounded-full !text-emerald-600 font-bold !ring-2 !ring-emerald-400",
                  disabled: "!text-gray-300 !cursor-not-allowed",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* DIVIDER */}
        <div
          className={`w-[1px] h-8 bg-gray-200 transition-opacity duration-300 ${hovered === "checkOut" ||
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
          className={`${commonContainerStyles} ${selectedBox === "guests" ? hoveringStyles : ""
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
            <p className="text-xs font-semibold text-gray-900">{t("bookingBar.who")}</p>
            <p className="text-sm text-gray-500">{t("bookingBar.addGuests")}</p>
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
              {bookingData?.guests.map((item, index) => (
                <div key={item.label} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {t(`bookingBar.${item.label}`)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t(`bookingBar.${item.title}`)}
                      </p>
                    </div>
                    <Counter
                      count={item.count}
                      onChange={(count) => {
                        setBookingData((prev: BookingBarTypes) => ({
                          ...prev,
                          guests: prev?.guests.map(
                            (g: {
                              label: string;
                              title: string;
                              count: number;
                            }) => (g.label === item.label ? { ...g, count } : g)
                          ),
                        }));
                        console.log(count);
                      }}
                    />
                  </div>
                  {bookingData?.guests.length - 1 !== index && (
                    <hr className="mt-4 border-gray-200" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pr-2">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer 
            transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
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
                    <label className="text-xs font-semibold text-gray-900 block mb-2">
                      Where
                    </label>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => setMobileStep("where")}
                        className="flex-1 text-left text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {bookingData?.destination || "Search destinations"}
                      </button>
                      {bookingData?.destination && (
                        <button
                          onClick={() => {
                            setBookingData((prev) => ({
                              ...prev,
                              destination: null,
                            }));
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Clear destination"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Destination Picker for Mobile */}
                  {mobileStep === "where" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border border-gray-300 rounded-2xl overflow-hidden"
                    >
                      <div className="max-h-[300px] overflow-y-auto">
                        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {t("bookingBar.suggestedDestinations")}
                          </h4>
                        </div>

                        <div className="py-2">
                          {destinations.map(
                            (country: { name: string; cities: string[] }) => (
                              <div key={country.name} className="mb-1">
                                {/* Country Header */}
                                <button
                                  onClick={() =>
                                    setDestinationSelectOpen(
                                      !destinationSelectOpen
                                    )
                                  }
                                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                                      <MapPin className="h-4 w-4 text-teal-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {country.name}
                                    </span>
                                  </div>
                                  <motion.div
                                    transition={{ duration: 0.2 }}
                                    animate={{
                                      rotate: destinationSelectOpen ? 90 : 0,
                                    }}
                                  >
                                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                                  </motion.div>
                                </button>

                                {/* Cities List */}
                                <AnimatePresence>
                                  {destinationSelectOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="ml-4 pl-8 border-l-2 border-gray-200">
                                        {country.cities.map((city: string) => (
                                          <button
                                            key={city}
                                            onClick={() => {
                                              setBookingData((prev) => ({
                                                ...prev,
                                                destination: `${city}, ${country.name}`,
                                              }));
                                              setMobileStep("dates");
                                            }}
                                            className="w-full text-left px-4 py-2.5 hover:bg-teal-50 transition-colors rounded-lg text-sm text-gray-700 hover:text-teal-700 my-0.5"
                                          >
                                            {city}
                                          </button>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Dates Section */}
                  <div className="border border-gray-300 rounded-2xl p-4">
                    <label className="text-xs font-semibold text-gray-900 block mb-2">
                      {t("bookingBar.when")}
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Check in</p>
                        <div className="flex items-center justify-between gap-1">
                          <button
                            onClick={() => setMobileStep("dates")}
                            className="text-sm text-gray-900 hover:underline"
                          >
                            {bookingData?.checkIn ? String(bookingData.checkIn) : t("bookingBar.addDates")}
                          </button>
                          {bookingData?.checkIn && (
                            <button
                              onClick={() => {
                                setBookingData((prev) => ({
                                  ...prev,
                                  checkIn: null,
                                  checkOut: null,
                                }));
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="w-[1px] bg-gray-300" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Check out</p>
                        <div className="flex items-center justify-between gap-1">
                          <button
                            onClick={() => setMobileStep("dates")}
                            className="text-sm text-gray-900 hover:underline"
                          >
                            {bookingData?.checkOut ? String(bookingData.checkOut) : t("bookingBar.addDates")}
                          </button>
                          {bookingData?.checkOut && (
                            <button
                              onClick={() => {
                                setBookingData((prev) => ({
                                  ...prev,
                                  checkOut: null,
                                }));
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar for Mobile */}
                  {mobileStep === "dates" && (
                    <div className="border border-gray-300 rounded-2xl p-4">
                      <DayPicker
                        mode="range"
                        selected={{
                          from: bookingData?.checkIn
                            ? new Date(bookingData.checkIn)
                            : undefined,
                          to: bookingData?.checkOut
                            ? new Date(bookingData.checkOut)
                            : undefined,
                        }}
                        onSelect={(date) => {
                          console.log(date);
                          setBookingData((prev: any) => ({
                            ...prev,
                            checkIn:
                              typeof date?.from !== "string"
                                ? date?.from?.toLocaleDateString("en-CA")
                                : date?.from,
                            checkOut:
                              typeof date?.to !== "string"
                                ? date?.to?.toLocaleDateString("en-CA")
                                : date?.to,
                          }));
                        }}
                        numberOfMonths={1}
                        disabled={{ before: new Date() }}
                        fromDate={new Date()}
                        modifiersClassNames={{
                          selected:
                            "!bg-emerald-500 text-white rounded-full font-medium",
                          range_start:
                            "!bg-teal-500 text-white rounded-l-full font-medium shadow-md",
                          range_end:
                            "!bg-emerald-500 text-white rounded-r-full font-medium shadow-md",
                          range_middle: "!bg-emerald-50 !text-emerald-900",
                          today:
                            "!rounded-full !text-emerald-600 font-bold !ring-2 !ring-emerald-400",
                          disabled: "!text-gray-300 !cursor-not-allowed",
                        }}
                      />
                    </div>
                  )}

                  {/* Guests Section */}
                  <div className="border border-gray-300 rounded-2xl p-4">
                    <label className="text-xs font-semibold text-gray-900 block mb-3">
                      {t("bookingBar.who")}
                    </label>
                    {bookingData?.guests.map((item, index) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {t(`bookingBar.${item.label}`)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {t(`bookingBar.${item.title}`)}
                            </p>
                          </div>
                          <Counter
                            count={item.count}
                            onChange={(count) => {
                              setBookingData((prev: BookingBarTypes) => ({
                                ...prev,
                                guests: prev?.guests.map((g) =>
                                  g.label === item.label ? { ...g, count } : g
                                ),
                              }));
                            }}
                          />
                        </div>
                        {bookingData?.guests.length - 1 !== index && (
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
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Search className="w-5 h-5" />
                    {t("bookingBar.search")}
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
