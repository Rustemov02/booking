import { useState, useCallback } from "react";
import { Calendar, MapPin, Users, Search } from "lucide-react";
//  ! CREATED BY CLAUDE - LAST VERSİON
// Types
interface BookingData {
  destination: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
  nights: number;
}

// Guest Selector Component
const GuestSelector = ({
  guests,
  onGuestsChange,
}: {
  guests: number;
  onGuestsChange: (value: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">Guests</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onGuestsChange(Math.max(1, guests - 1))}
          className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-600"
          aria-label="Decrease guests"
        >
          −
        </button>
        <span className="w-8 text-center font-medium text-gray-900">
          {guests}
        </span>
        <button
          onClick={() => onGuestsChange(Math.min(20, guests + 1))}
          className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-600"
          aria-label="Increase guests"
        >
          +
        </button>
      </div>
    </div>
  );
};

// Nights Selector Component
const NightsSelector = ({
  nights,
  onNightsChange,
}: {
  nights: number;
  onNightsChange: (value: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">Nights</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNightsChange(Math.max(1, nights - 1))}
          className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-600"
          aria-label="Decrease nights"
        >
          −
        </button>
        <span className="w-8 text-center font-medium text-gray-900">
          {nights}
        </span>
        <button
          onClick={() => onNightsChange(Math.min(30, nights + 1))}
          className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-600"
          aria-label="Increase nights"
        >
          +
        </button>
      </div>
    </div>
  );
};

// Simple Calendar Component (placeholder - would use a proper date picker in production)
const SimpleDatePicker = ({
  selected,
  onSelect,
  onClose,
}: {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
  onClose: () => void;
}) => {
  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-80">
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, index) => (
          <button
            key={index}
            onClick={() => {
              onSelect(date);
              onClose();
            }}
            className={`p-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-50 hover:text-blue-600 ${
              selected?.toDateString() === date.toDateString()
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                : "text-gray-700"
            }`}
          >
            <div className="text-xs">{formatDate(date)}</div>
          </button>
        ))}
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

// Main Booking Bar Component
export function BookingBar() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(3);

  // Popover states
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const formatDate = useCallback((date: Date | undefined) => {
    if (!date) return "Add date";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }, []);

  const handleSearch = useCallback(() => {
    const bookingData: BookingData = {
      destination,
      checkIn,
      checkOut,
      guests,
      nights,
    };
    console.log("Search with:", bookingData);
    // Handle search logic here
  }, [destination, checkIn, checkOut, guests, nights]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Destination */}
        <div className="md:col-span-1">
          <label
            htmlFor="destination"
            className="block text-xs font-medium text-gray-600 mb-2"
          >
            Where
          </label>
          <div className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <input
              id="destination"
              type="text"
              placeholder="Add destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Check-in
          </label>
          <Popover
            open={checkInOpen}
            onOpenChange={setCheckInOpen}
            trigger={
              <button
                className="w-full flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-left"
                aria-label="Select check-in date"
              >
                <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-900">
                  {formatDate(checkIn)}
                </span>
              </button>
            }
          >
            <SimpleDatePicker
              selected={checkIn}
              onSelect={setCheckIn}
              onClose={() => setCheckInOpen(false)}
            />
          </Popover>
        </div>

        {/* Check-out */}
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Check-out
          </label>
          <Popover
            open={checkOutOpen}
            onOpenChange={setCheckOutOpen}
            trigger={
              <button
                className="w-full flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-left"
                aria-label="Select check-out date"
              >
                <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-900">
                  {formatDate(checkOut)}
                </span>
              </button>
            }
          >
            <SimpleDatePicker
              selected={checkOut}
              onSelect={setCheckOut}
              onClose={() => setCheckOutOpen(false)}
            />
          </Popover>
        </div>

        {/* Guests & Nights */}
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Who
          </label>
          <Popover
            open={guestsOpen}
            onOpenChange={setGuestsOpen}
            trigger={
              <button
                className="w-full flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-left"
                aria-label="Select guests"
              >
                <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-900">{guests} guests</span>
              </button>
            }
          >
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-64 space-y-3">
              <GuestSelector guests={guests} onGuestsChange={setGuests} />
              <div className="border-t border-gray-200" />
              <NightsSelector nights={nights} onNightsChange={setNights} />
            </div>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="md:col-span-1 flex items-end">
          <button
            onClick={handleSearch}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            aria-label="Search hotels"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
