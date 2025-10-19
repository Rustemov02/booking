import { motion } from "framer-motion";
import { Star, MapPin, Wifi, Coffee, Waves, Heart } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import apiRequest from "../../api/apiRequest";

export interface HotelResultCardProps {
  _id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  features: {
    icon: string;
    name: string;
  }[];
  description: string;
  price: number;
  currency: string;
  priceUnit: string;
  available: boolean;
  capacity: number;
  petFriendly: boolean;
  isSaved: boolean;
  viewMode?: "list" | "grid";
}

export function HotelResultCard({
  _id,
  name,
  image,
  rating,
  reviews,
  location,
  description,
  price,
  isSaved,
  // originalPrice,
  // distance,
  // amenities = [],
  // isSponsored = false,
  viewMode = "list",
}: HotelResultCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi":
        return <Wifi className="h-4 w-4" />;
      case "Breakfast":
        return <Coffee className="h-4 w-4" />;
      case "Pool":
        return <Waves className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const isGridView = viewMode === "grid";

  // const toggleSave = async (e: any) => {
  //   // e.stopPropagation();
  //   console.log(_id);
  //   try {
  //     await apiRequest({
  //       method: "PATCH",
  //       url: `/api/rooms/${_id}`,
  //       data: { isSaved: true },
  //       onError: (err) => console.log("ERROR : ", err),
  //     });
  //   } catch (err) {
  //     console.log("Error : ", err);
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-neutral-300 transition-all group"
    >
      <div
        className={`grid ${
          isGridView ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[320px_1fr]"
        } gap-0`}
      >
        {/* Image Section */}
        <div
          className={`relative ${
            isGridView ? "h-56" : "h-64 md:h-auto"
          } overflow-hidden`}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* <button
            // onClick={() => toggleSave()}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-all shadow-md"
          >
            <Heart
              className={`h-5 w-5 transition-all ${
                isSaved ? "fill-rose-500 text-rose-500" : "text-neutral-600"
              }`}
            />
          </button> */}
          {/* {isSponsored && (
            <Badge className="absolute top-4 left-4 bg-teal-600 text-white border-0 px-3 py-1 rounded-full shadow-md">
              Featured
            </Badge>
          )}
          {originalPrice && (
            <Badge className="absolute bottom-4 left-4 bg-rose-600 text-white border-0 px-3 py-1 rounded-full shadow-md">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% Off
            </Badge>
          )} */}
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl text-neutral-900 mb-2 group-hover:text-teal-700 transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{location}</span>
                {/* {distance && (
                  <span className="text-neutral-400">• {distance}</span>
                )} */}
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-teal-50 text-teal-700 px-3 py-2 rounded-xl ml-3">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold">{rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-neutral-200 text-neutral-200"
                }`}
              />
            ))}
            <span className="text-sm text-neutral-500 ml-2">
              {reviews.toLocaleString()} reviews
            </span>
          </div>

          <p className="text-neutral-600 mb-5 flex-1 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Amenities */}
          {/* {amenities.length > 0 && (
            <div className="flex items-center gap-4 mb-5">
              {amenities.slice(0, 3).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-neutral-600"
                >
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
              {amenities.length > 3 && (
                <span className="text-sm text-neutral-400">
                  +{amenities.length - 3} more
                </span>
              )}
            </div>
          )} */}

          {/* Price and CTA */}
          <div className="flex items-center justify-between mt-auto pt-5 border-t border-neutral-100">
            <div>
              <div className="flex items-center gap-2 mb-1 ">
                {/* {originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    ${originalPrice}
                  </span>
                )} */}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl text-neutral-900">${price}</span>
                <span className="text-sm text-neutral-500">/night</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Includes taxes and fees
              </p>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700 rounded-xl px-6">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
