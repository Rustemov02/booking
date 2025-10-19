import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
// import { BookingBar } from "../components/BookingBar";
import BookingBar from "../../components/bookingBar/bookingBar";
import { DestinationCard } from "../../components/DestinationCard";
import { RoomCard } from "../../components/RoomCard";
import { AmenitiesSection } from "../../components/AmenitiesSection";
import { SpecialOffersSection } from "../../components/SpecialOffersSection";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import apiRequest from "../../api/apiRequest";

export default function Home() {
  const destinations = [
    {
      name: "Baku",
      image:
        "https://images.unsplash.com/photo-1663668045441-a328bb02cc5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWt1JTIwY2l0eSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTk5NDk0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Popular",
    },
    {
      name: "Paris",
      image:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc1OTg2NDQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Trending",
    },
    {
      name: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmV8ZW58MXx8fHwxNzU5ODk4NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Tokyo",
      image:
        "https://images.unsplash.com/photo-1713635632551-e633ee4cb95e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NTk5MDkwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Swiss Alps",
      image:
        "https://images.unsplash.com/photo-1666817059358-940080103885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHJlc29ydCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTk5NDk0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "New",
    },
  ];

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await apiRequest({
          method: "GET",
          url: "/api/rooms/",
          onError: (err) => console.log(err),
          onSuccess: (data) => setRooms(data.rooms),
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 py-20 ">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xlF font-bold text-white mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl text-white/90">
              Discover amazing deals on hotels worldwide
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BookingBar />
          </motion.div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-semibold">Trending Destinations</h2>
            </div>
            <Button variant="ghost">View All</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DestinationCard {...destination} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Trip Planner */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-semibold">Quick Trip Planner</h2>
            </div>
            <p className="text-gray-600">
              Pick a vibe and explore the top destinations in a few clicks
            </p>
          </div>

          <Tabs defaultValue="mountains" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="mountains">Mountains</TabsTrigger>
              <TabsTrigger value="beaches">Beaches</TabsTrigger>
              <TabsTrigger value="cities">Cities</TabsTrigger>
              <TabsTrigger value="culture">Culture</TabsTrigger>
              <TabsTrigger value="outdoors">Outdoors</TabsTrigger>
            </TabsList>
            <TabsContent value="mountains" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-lg overflow-hidden shadow-md cursor-pointer h-40"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1666817059358-940080103885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHJlc29ydCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTk5NDk0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Mountain destination"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="font-semibold text-sm">Aspen</p>
                      <p className="text-xs opacity-90">1,234 properties</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="beaches">
              <p className="text-center text-gray-500">
                Beach destinations coming soon...
              </p>
            </TabsContent>
            <TabsContent value="cities">
              <p className="text-center text-gray-500">
                City destinations coming soon...
              </p>
            </TabsContent>
            <TabsContent value="culture">
              <p className="text-center text-gray-500">
                Cultural destinations coming soon...
              </p>
            </TabsContent>
            <TabsContent value="outdoors">
              <p className="text-center text-gray-500">
                Outdoor destinations coming soon...
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-semibold">Homes Guests Love</h2>
            </div>
            <Button variant="ghost">View All</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <RoomCard {...room} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <SpecialOffersSection />
      {/* Amenities */}
      <AmenitiesSection />
      {/* Newsletter */}
      {/* <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get exclusive deals, travel tips,
              and insider access to special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none"
              />
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Hotels.com</h3>
              <p className="text-sm">
                Your trusted partner for finding the perfect accommodation
                worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
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
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
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
              <h4 className="text-white font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-sm">
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
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 Hotels.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
