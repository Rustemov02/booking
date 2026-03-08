import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
import toast from "react-hot-toast";
import { LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { Button } from "../../components/ui/button";
import { FilterSidebar } from "../../components/Filter/FilterSidebar";
import { Sheet, SheetContent } from "../../components/ui/sheet";
import { HotelResultCard, HotelResultCardProps } from "./HotelResultCard";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [filterData, setFilterData] = useState<HotelResultCardProps[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const params = Object.fromEntries(searchParams.entries());

  const bookingBarData: {
    checkIn: string | null;
    checkOut: string | null;
    location: string | null;
    adults: number;
    children: number;
    rooms: number;
    pets: number;
  } = {
    checkIn: params.checkIn || null,
    checkOut: params.checkOut || null,
    location: params.destination || null,
    adults: params.adults ? Number(params.adults) : 1,
    children: params.children ? Number(params.children) : 0,
    rooms: params.rooms ? Number(params.rooms) : 1,
    pets: params.pets ? Number(params.pets) : 0,
  };

  const [applyFiltersData, setApplyFiltersData] = useState<{
    amenities: string[];
    maxPrice: number | null;
    minPrice: number | null;
    minRating: number | undefined;
    roomTypes: string[];
  }>({
    amenities: [],
    maxPrice: null,
    minPrice: null,
    minRating: undefined,
    roomTypes: [],
  });
  const { amenities, maxPrice, minPrice, minRating, roomTypes } =
    applyFiltersData;
  const { location, checkIn, checkOut, adults, children } = bookingBarData;

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    const searchResult = async () => {
      try {
        const response = await apiRequest({
          method: "POST",
          url: "/api/rooms/search",
          data: {
            ...bookingBarData,
            location: bookingBarData.location, // Explicitly pass location
            amenities,
            maxPrice,
            minPrice,
            minRating,
            roomTypes,
          },
          onError: (err) => {
            setError(err?.response?.data?.error);
          },
        });

        if (!response) {
          toast.error("Xəta baş verdi");
        }
        setFilterData(response?.rooms);
        console.log("RESPONSE ROOMS : ", response?.rooms);
      } catch (err) {
        console.log("ERROR :", err);
      }
    };

    searchResult();
  }, [searchParams, applyFiltersData]);

  useEffect(() => {
    console.log(filterData);
  }, [filterData]);

  // const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  // const [selectedRating, setSelectedRating] = useState<string[]>([]);
  // const [selectedDistance, setSelectedDistance] = useState<string[]>([]);
  // const personCount = { adult: 1, children: 2 };

  const [viewMode, setViewMode] = useState("list");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 group pl-0"
          >
            <motion.span
              animate={{ x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ←
            </motion.span>
            <span>Back to Search</span>
          </Button>
        </div>

        {/* Search Bar */}
        <SearchBar
          location={location as string}
          checkIn={checkIn as string}
          checkOut={checkOut as string}
          guests={adults + children}
          onModifySearch={() => navigate("/")}
          onToggleFilters={() => setShowMobileFilters(true)}
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl text-neutral-900 mb-2">{location}</h1>
            <p className="text-neutral-600">
              {checkIn} - {checkOut} • {adults + children} guests
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-white rounded-xl border border-neutral-200 p-1.5 shadow-sm">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-lg"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-lg"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              onApplyFilters={(data) => setApplyFiltersData(data as any)}
            />
          </div>

          {/* Mobile Filters Sheet */}
          <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
            <SheetContent
              side="left"
              className="w-full sm:w-[400px] overflow-y-auto"
            >
              <FilterSidebar
                onApplyFilters={(data) => setApplyFiltersData(data as any)}
                onClose={() => setShowMobileFilters(false)}
                isMobile
              />
            </SheetContent>
          </Sheet>

          {/* Results Grid/List */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                filterData.length === 0 ? (
                  <div className="w-full h-full flex justify-center items-start">
                    <p>No data found</p>
                  </div>
                ) : (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 xl:grid-cols-2 gap-6"
                  >
                    {filterData.map((hotel) => (
                      <HotelResultCard
                        key={hotel._id}
                        {...hotel}
                        viewMode="grid"
                      />
                    ))}
                  </motion.div>
                )
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {filterData.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <p>No data found</p>
                    </div>
                  ) : (
                    filterData.map((hotel, index) => (
                      <motion.div
                        key={hotel._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <HotelResultCard {...hotel} viewMode="list" />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Load More */}
            {/* <div className="flex justify-center pt-8">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-neutral-300 hover:bg-neutral-50"
              >
                Load More Results
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-16 mt-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white mb-4">Luxe Stay</h3>
              <p className="text-sm leading-relaxed">
                Discover exceptional accommodations for the discerning traveler.
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Support</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Destinations</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Popular Cities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Beach Resorts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mountain Retreats
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Urban Hotels
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center text-sm">
            <p>© 2025 Luxe Stay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchResult;
