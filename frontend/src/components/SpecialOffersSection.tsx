import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Percent, Gift, Clock } from "lucide-react";
import { ToastMessage } from "../utils/message";
import { useTranslation } from "react-i18next";

const offers = [
  {
    icon: Percent,
    title: "Early Bird Special",
    description: "Book 30 days in advance and save up to 25%",
    discount: "25% OFF",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Gift,
    title: "Weekend Getaway",
    description: "Stay 2 nights, get the 3rd night free",
    discount: "FREE NIGHT",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Clock,
    title: "Last Minute Deal",
    description: "Book within 24 hours and save 15%",
    discount: "15% OFF",
    color: "from-orange-500 to-red-600",
  },
];

export function SpecialOffersSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3">Special Offers</h2>
          <p className="text-gray-600">
            Limited time deals you don't want to miss
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative rounded-2xl overflow-hidden shadow-lg"
            >
              <div
                className={`bg-gradient-to-br ${offer.color} p-8 text-white`}
              >
                <Badge className="bg-white/20 text-white border-0 mb-4">
                  {offer.discount}
                </Badge>
                <div className="mb-4">
                  <offer.icon className="h-12 w-12 mb-3" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-white/90 text-sm mb-6">
                  {offer.description}
                </p>
                <Button
                  variant="secondary"
                  className="w-full bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => ToastMessage(t("notAvailableYet"))}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
