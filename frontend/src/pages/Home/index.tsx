import BookingBar from "../../components/bookingBar/bookingBar";
import { DestinationCard } from "../../components/DestinationCard";
import { RoomCard } from "../../components/RoomCard";
import { AmenitiesSection } from "../../components/AmenitiesSection";
import { SpecialOffersSection } from "../../components/SpecialOffersSection";
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
import baku from "../../assets/images/baku.jpg";
import zaqatala from "../../assets/images/zaqatala.jpg";
import quba from "../../assets/images/quba.jpg";
import qusar from "../../assets/images/qusar.jfif";
import qebele from "../../assets/images/qebele.jpg";
import sheki from "../../assets/images/sheki.jpg";
import { useTranslation } from "react-i18next";

export default function Home() {
  const destinations = [
    {
      id: 1,
      name: "Baku",
      properties: 1250,
      image: baku,
    },
    {
      id: 2,
      name: "Zakatala",
      properties: 340,
      image: zaqatala,
    },
    {
      id: 3,
      name: "Sheki",
      properties: 520,
      image: sheki,
    },
    {
      id: 4,
      name: "Qabala",
      properties: 420,
      image: qebele,
    },
    {
      id: 5,
      name: "Qusar",
      properties: 280,
      image: qusar,
    },
    {
      id: 6,
      name: "Quba",
      properties: 610,
      image: quba,
    },
  ];

  const [rooms, setRooms] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await apiRequest({
          method: "GET",
          url: "/api/rooms/",
          onError: (err) => console.log(err),
          onSuccess: (data) => setRooms(data.rooms),
          showErrorToast: false,
        });
        console.log(response.rooms);
        setRooms(response.rooms);
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
              {t("home.heroTitle")}
            </h1>
            <p className="text-xl text-white/90">{t("home.heroSubtitle")}</p>
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
              <h2 className="text-3xl font-semibold">
                {t("home.trendingDestinations")}
              </h2>
            </div>
            {/* <Button variant="ghost">View All</Button> */}
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



      {/* Featured Rooms */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-semibold">
                {t("home.homesGuestsLove")}
              </h2>
            </div>
            {/* <Button variant="ghost">View All</Button> */}
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
              <p className="text-sm">{t("home.trustedPartner")}</p>
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
