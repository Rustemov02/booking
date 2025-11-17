import React, { useState, useCallback } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Check,
  X,
  Edit2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  onModifySearch: () => void;
  onToggleFilters?: () => void;
}

// Modal Component
const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

// Full Calendar Component with Month Navigation
const FullCalendar = ({
  selected,
  onSelect,
  onClose,
}: {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
  onClose: () => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const monthDays = getDaysInMonth(currentMonth);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((date, index) => (
          <button
            key={index}
            onClick={() => {
              if (date && !isPast(date)) {
                onSelect(date);
                onClose();
              }
            }}
            disabled={!date || isPast(date)}
            className={`
              p-2 text-sm rounded-lg transition-all
              ${!date ? "invisible" : ""}
              ${
                isPast(date)
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }
              ${
                selected?.toDateString() === date?.toDateString()
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                  : "text-gray-700"
              }
              ${
                isToday(date) &&
                selected?.toDateString() !== date?.toDateString()
                  ? "border border-blue-600"
                  : ""
              }
            `}
          >
            {date ? date.getDate() : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

// Destination Search Modal
const DestinationModal = ({
  isOpen,
  onClose,
  value,
  onChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState(value);

  const popularDestinations = [
    "Baku, Azerbaijan",
    "Zagatala, Azerbaijan",
    "Gabala, Azerbaijan",
    "Sheki, Azerbaijan",
    "Ganja, Azerbaijan",
    "Lankaran, Azerbaijan",
  ];

  const handleSelect = (destination: string) => {
    onChange(destination);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Where to?</h3>

        <div className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <MapPin className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm text-gray-900"
            autoFocus
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Popular destinations
          </h4>
          <div className="space-y-1">
            {popularDestinations
              .filter((dest) =>
                dest.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((destination) => (
                <button
                  key={destination}
                  onClick={() => handleSelect(destination)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 hover:text-blue-600"
                >
                  {destination}
                </button>
              ))}
          </div>
        </div>

        <button
          onClick={() => {
            onChange(searchValue);
            onClose();
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Apply
        </button>
      </div>
    </Modal>
  );
};

// Guest Selector Component
const GuestSelector = ({
  adults,
  children,
  rooms,
  onAdultsChange,
  onChildrenChange,
  onRoomsChange,
}: {
  adults: number;
  children: number;
  rooms: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onRoomsChange: (value: number) => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-72 space-y-3">
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-gray-700">Adults</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onAdultsChange(Math.max(1, adults - 1))}
            className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-600"
          >
            −
          </button>
          <span className="w-8 text-center font-medium text-gray-900">
            {adults}
          </span>
          <button
            onClick={() => onAdultsChange(Math.min(20, adults + 1))}
            className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-600"
          >
            +
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200" />
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-gray-700">Children</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onChildrenChange(Math.max(0, children - 1))}
            className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-600"
          >
            −
          </button>
          <span className="w-8 text-center font-medium text-gray-900">
            {children}
          </span>
          <button
            onClick={() => onChildrenChange(Math.min(20, children + 1))}
            className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-600"
          >
            +
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200" />
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-gray-700">Rooms</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onRoomsChange(Math.max(1, rooms - 1))}
            className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-600"
          >
            −
          </button>
          <span className="w-8 text-center font-medium text-gray-900">
            {rooms}
          </span>
          <button
            onClick={() => onRoomsChange(Math.min(10, rooms + 1))}
            className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-600"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

// Popover Component
const Popover = ({
  trigger,
  children,
  open,
  onOpenChange,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <div className="relative">
      <div onClick={() => onOpenChange(!open)}>{trigger}</div>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => onOpenChange(false)}
          />
          <div className="absolute top-full left-0 mt-2 z-50">{children}</div>
        </>
      )}
    </div>
  );
};

export function SearchBar({
  location,
  checkIn,
  checkOut,
  guests,
  onModifySearch,
  onToggleFilters,
}: SearchBarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    destination: location,
    checkIn: checkIn ? new Date(checkIn) : undefined,
    checkOut: checkOut ? new Date(checkOut) : undefined,
    adults: 1,
    children: 1,
    rooms: 3,
    pets: 0,
  });

  // Modal states
  const [destinationModalOpen, setDestinationModalOpen] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  // URL-dən parametrləri oxu
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkInStr = params.get("checkIn");
    const checkOutStr = params.get("checkOut");

    setEditValues({
      destination: params.get("destination") || location,
      checkIn: checkInStr ? new Date(checkInStr) : undefined,
      checkOut: checkOutStr ? new Date(checkOutStr) : undefined,
      adults: parseInt(params.get("adults") || "1"),
      children: parseInt(params.get("children") || "0"),
      rooms: parseInt(params.get("rooms") || "1"),
      pets: parseInt(params.get("pets") || "0"),
    });
  }, [location, checkIn, checkOut]);

  const formatDate = useCallback((date: Date | undefined) => {
    if (!date) return "Add date";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const totalGuests = editValues.adults + editValues.children;

  const handleSave = () => {
    if (!editValues.checkIn || !editValues.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    // URL-i yenilə
    const params = new URLSearchParams();
    params.set("destination", editValues.destination);
    params.set("adults", editValues.adults.toString());
    params.set("children", editValues.children.toString());
    params.set("rooms", editValues.rooms.toString());
    params.set("pets", editValues.pets.toString());
    params.set("checkIn", editValues.checkIn.toISOString().split("T")[0]);
    params.set("checkOut", editValues.checkOut.toISOString().split("T")[0]);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);

    setIsEditing(false);
    window.location.reload();
  };

  const handleCancel = () => {
    const params = new URLSearchParams(window.location.search);
    const checkInStr = params.get("checkIn");
    const checkOutStr = params.get("checkOut");

    setEditValues({
      destination: params.get("destination") || location,
      checkIn: checkInStr ? new Date(checkInStr) : undefined,
      checkOut: checkOutStr ? new Date(checkOutStr) : undefined,
      adults: parseInt(params.get("adults") || "1"),
      children: parseInt(params.get("children") || "0"),
      rooms: parseInt(params.get("rooms") || "1"),
      pets: parseInt(params.get("pets") || "0"),
    });
    setIsEditing(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-6 mb-8 w-full max-w-6xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.div
              key="view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col lg:flex-row lg:items-center gap-6"
            >
              <div className="flex-1 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2.5 rounded-xl">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-0.5">Location</p>
                    <p className="text-gray-900 font-medium">
                      {editValues.destination}
                    </p>
                  </div>
                </div>
                <div className="hidden lg:block w-px h-12 bg-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2.5 rounded-xl">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-0.5">Dates</p>
                    <p className="text-gray-900 font-medium">
                      {formatDate(editValues.checkIn)} -{" "}
                      {formatDate(editValues.checkOut)}
                    </p>
                  </div>
                </div>
                <div className="hidden lg:block w-px h-12 bg-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2.5 rounded-xl">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-0.5">Guests</p>
                    <p className="text-gray-900 font-medium">
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} •{" "}
                      {editValues.rooms}{" "}
                      {editValues.rooms === 1 ? "Room" : "Rooms"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-700 hover:text-blue-600"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Search
                </button>
                <button
                  onClick={onModifySearch}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Home page
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="edit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Destination */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Where
                  </label>
                  <button
                    onClick={() => setDestinationModalOpen(true)}
                    className="w-full flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-left"
                  >
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-900 truncate">
                      {editValues.destination || "Add destination"}
                    </span>
                  </button>
                </div>

                {/* Check-in */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Check-in
                  </label>
                  <Popover
                    open={checkInOpen}
                    onOpenChange={setCheckInOpen}
                    trigger={
                      <button className="w-full flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-left">
                        <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900">
                          {formatDate(editValues.checkIn)}
                        </span>
                      </button>
                    }
                  >
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4">
                      <FullCalendar
                        selected={editValues.checkIn}
                        onSelect={(date) =>
                          setEditValues({ ...editValues, checkIn: date })
                        }
                        onClose={() => setCheckInOpen(false)}
                      />
                    </div>
                  </Popover>
                </div>

                {/* Check-out */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Check-out
                  </label>
                  <Popover
                    open={checkOutOpen}
                    onOpenChange={setCheckOutOpen}
                    trigger={
                      <button className="w-full flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-left">
                        <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900">
                          {formatDate(editValues.checkOut)}
                        </span>
                      </button>
                    }
                  >
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4">
                      <FullCalendar
                        selected={editValues.checkOut}
                        onSelect={(date) =>
                          setEditValues({ ...editValues, checkOut: date })
                        }
                        onClose={() => setCheckOutOpen(false)}
                      />
                    </div>
                  </Popover>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Who
                  </label>
                  <Popover
                    open={guestsOpen}
                    onOpenChange={setGuestsOpen}
                    trigger={
                      <button className="w-full flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-left">
                        <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900">
                          {totalGuests} guests
                        </span>
                      </button>
                    }
                  >
                    <GuestSelector
                      adults={editValues.adults}
                      children={editValues.children}
                      rooms={editValues.rooms}
                      onAdultsChange={(value) =>
                        setEditValues({ ...editValues, adults: value })
                      }
                      onChildrenChange={(value) =>
                        setEditValues({ ...editValues, children: value })
                      }
                      onRoomsChange={(value) =>
                        setEditValues({ ...editValues, rooms: value })
                      }
                    />
                  </Popover>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all font-medium text-gray-700 hover:bg-gray-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Check className="h-4 w-4" />
                  Apply Changes
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Destination Modal */}
      <DestinationModal
        isOpen={destinationModalOpen}
        onClose={() => setDestinationModalOpen(false)}
        value={editValues.destination}
        onChange={(value) =>
          setEditValues({ ...editValues, destination: value })
        }
      />
    </>
  );
}
