import { motion } from "framer-motion";
import {
  Waves,
  Dumbbell,
  UtensilsCrossed,
  Wifi,
  Car,
  Users,
} from "lucide-react";

const amenities = [
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Outdoor pool with stunning views",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "24/7 state-of-the-art gym",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant",
    description: "Fine dining and room service",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "High-speed internet throughout",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Secure parking for all guests",
  },
  {
    icon: Users,
    title: "Meeting Rooms",
    description: "Professional conference facilities",
  },
];

export function AmenitiesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3">Premium Amenities</h2>
          <p className="text-gray-600">
            Everything you need for a perfect stay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-4">
                <amenity.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">{amenity.title}</h3>
              <p className="text-sm text-gray-600">{amenity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
