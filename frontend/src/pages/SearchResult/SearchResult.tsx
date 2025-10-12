import { useEffect, useState } from "react";
import BookingBar from "../../components/bookingBar/bookingBar";
import MarkFilter from "../../components/markFilter/MarkFilter";
import Card from "../../components/card/Card";
import { useSearchParams } from "react-router-dom";
import { BookingBarTypes } from "../../types";
import apiRequest from "../../api/apiRequest";
import toast from "react-hot-toast";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { Button } from "../../components/ui/button";
import { FilterSidebar } from "../../components/Filter/FilterSidebar";
import { Sheet, SheetContent } from "../../components/ui/sheet";
import { HotelResultCard } from "./HotelResultCard";

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
  const [viewMode, setViewMode] = useState("list");
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

  const hotels = [
    {
      id: "1",
      name: "Grand Luxury Hotel & Spa",
      image:
        "https://images.unsplash.com/photo-1634041441461-a1789d008830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDI1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 9.2,
      reviews: 1284,
      location: "Downtown Dubai, UAE",
      description:
        "Experience ultimate luxury with stunning city views, world-class dining, and a rooftop infinity pool. Perfect for business and leisure travelers.",
      price: 245,
      originalPrice: 320,
      distance: "0.5 km from center",
      amenities: ["WiFi", "Pool", "Breakfast"],
      isSponsored: true,
    },
    {
      id: "2",
      name: "Boutique Resort & Suites",
      image:
        "https://images.unsplash.com/photo-1752874068731-ac862330e666?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwcm9vbXxlbnwxfHx8fDE3NjAxODE1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 8.9,
      reviews: 856,
      location: "Marina Bay, Dubai",
      description:
        "Charming boutique hotel offering personalized service, elegant rooms, and a serene atmosphere. Located near major attractions and shopping districts.",
      price: 185,
      originalPrice: 250,
      distance: "1.2 km from center",
      amenities: ["WiFi", "Breakfast"],
    },
    {
      id: "3",
      name: "Paradise Resort & Casino",
      image:
        "https://images.unsplash.com/photo-1722409195473-d322e99621e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBzd2ltbWluZyUyMHBvb2x8ZW58MXx8fHwxNzYwMTc1MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 9.5,
      reviews: 2134,
      location: "Palm Jumeirah, Dubai",
      description:
        "All-inclusive beachfront resort featuring multiple pools, spa facilities, and entertainment options. Ideal for families and couples seeking relaxation.",
      price: 425,
      distance: "3.5 km from center",
      amenities: ["WiFi", "Pool", "Breakfast"],
    },
    {
      id: "4",
      name: "Executive Business Hotel",
      image:
        "https://images.unsplash.com/photo-1563340284-cadcc9976727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjB2aWV3fGVufDF8fHx8MTc2MDIwMTE3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 8.7,
      reviews: 643,
      location: "Business Bay, Dubai",
      description:
        "Modern hotel designed for business travelers with state-of-the-art meeting rooms, high-speed internet, and convenient airport access.",
      price: 195,
      distance: "0.8 km from center",
      amenities: ["WiFi", "Breakfast"],
    },
    {
      id: "5",
      name: "Imperial Palace Hotel",
      image:
        "https://images.unsplash.com/photo-1743061339900-e40775a80524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwMjI4MzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 9.4,
      reviews: 1567,
      location: "City Center, Dubai",
      description:
        "Sophisticated luxury hotel with classical elegance, Michelin-star dining, and impeccable service. A landmark destination in the heart of the city.",
      price: 385,
      originalPrice: 480,
      distance: "0.3 km from center",
      amenities: ["WiFi", "Pool", "Breakfast"],
      isSponsored: true,
    },
    {
      id: "6",
      name: "Coastal View Resort",
      image:
        "https://images.unsplash.com/photo-1634041441461-a1789d008830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDI1OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 9.1,
      reviews: 923,
      location: "Jumeirah Beach, Dubai",
      description:
        "Beachfront paradise with private beach access, water sports, and spectacular sunset views. Perfect for a memorable vacation experience.",
      price: 295,
      distance: "4.2 km from center",
      amenities: ["WiFi", "Pool", "Breakfast"],
    },
  ];
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Bar */}
        <SearchBar
          location="Dubai, UAE"
          checkIn="Dec 15"
          checkOut="Dec 18"
          guests={2}
          onModifySearch={() => console.log("Modify search")}
          onToggleFilters={() => setShowMobileFilters(true)}
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl text-neutral-900 mb-2">Dubai, UAE</h1>
            <p className="text-neutral-600">
              142 properties • Dec 15 - Dec 18 • 2 guests
            </p>
          </div>

          <div className="flex items-center gap-3">
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

            {/* Sort */}
            {/* <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px] bg-white rounded-xl border-neutral-200 shadow-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Mobile Filters Sheet */}
          <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
            <SheetContent
              side="left"
              className="w-full sm:w-[400px] overflow-y-auto"
            >
              <FilterSidebar
                onClose={() => setShowMobileFilters(false)}
                isMobile
              />
            </SheetContent>
          </Sheet>

          {/* Results Grid/List */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 xl:grid-cols-2 gap-6"
                >
                  {hotels.map((hotel) => (
                    <HotelResultCard
                      key={hotel.id}
                      {...hotel}
                      viewMode="grid"
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {hotels.map((hotel, index) => (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <HotelResultCard {...hotel} viewMode="list" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Load More */}
            <div className="flex justify-center pt-8">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-neutral-300 hover:bg-neutral-50"
              >
                Load More Results
              </Button>
            </div>
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
