import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Moon,
  Search,
} from "lucide-react";
import { format } from "date-fns";

export function BookingBar() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(3);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl mx-auto backdrop-blur-sm bg-white/95">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Destination */}
        <div className="md:col-span-1">
          <label className="block text-xs text-gray-600 mb-1">Where</label>
          <div className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer">
            <MapPin className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Add destination"
              className="flex-1 outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="md:col-span-1">
          <label className="block text-xs text-gray-600 mb-1">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors text-left">
                <CalendarIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm">
                  {checkIn ? format(checkIn, "MMM dd") : "Add date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="md:col-span-1">
          <label className="block text-xs text-gray-600 mb-1">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors text-left">
                <CalendarIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm">
                  {checkOut ? format(checkOut, "MMM dd") : "Add date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests & Nights */}
        <div className="md:col-span-1">
          <label className="block text-xs text-gray-600 mb-1">Who</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors text-left">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{guests} guests</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Guests</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{guests}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setGuests(guests + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Nights</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNights(Math.max(1, nights - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{nights}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNights(nights + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="md:col-span-1 flex items-end">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
