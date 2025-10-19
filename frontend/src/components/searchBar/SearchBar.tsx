import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Calendar, Users, MapPin, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  onModifySearch: () => void;
  onToggleFilters?: () => void;
}

export function SearchBar({
  location,
  checkIn,
  checkOut,
  guests,
  onModifySearch,
  onToggleFilters,
}: SearchBarProps) {
  // const activeFilters = [
  //   { label: "Free WiFi", value: "wifi" },
  //   { label: "Pool", value: "pool" },
  //   { label: "Breakfast", value: "breakfast" },
  // ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 mb-8"
    >
      {/* Search Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-teal-50 p-2.5 rounded-xl">
              <MapPin className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-0.5">Location</p>
              <p className="text-neutral-900">{location}</p>
            </div>
          </div>
          <div className="hidden lg:block w-px h-12 bg-neutral-200" />
          <div className="flex items-center gap-3">
            <div className="bg-teal-50 p-2.5 rounded-xl">
              <Calendar className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-0.5">Dates</p>
              <p className="text-neutral-900">
                {checkIn} - {checkOut}
              </p>
            </div>
          </div>
          <div className="hidden lg:block w-px h-12 bg-neutral-200" />
          <div className="flex items-center gap-3">
            <div className="bg-teal-50 p-2.5 rounded-xl">
              <Users className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-0.5">Guests</p>
              <p className="text-neutral-900">
                {guests} {guests === 1 ? "Guest" : "Guests"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="lg:hidden rounded-xl border-neutral-300"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button
            onClick={onModifySearch}
            className="bg-teal-600 hover:bg-teal-700 rounded-xl px-6"
          >
            Home page
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {/* {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-5 border-t border-neutral-100">
          <span className="text-sm text-neutral-600">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter.value}
              variant="secondary"
              className="gap-2 cursor-pointer hover:bg-neutral-200 transition-colors rounded-lg px-3 py-1.5 bg-neutral-100 border-0"
            >
              {filter.label}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-auto px-3 py-1.5"
          >
            Clear all
          </Button>
        </div>
      )} */}
    </motion.div>
  );
}
