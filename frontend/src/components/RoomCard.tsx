import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Star,
  Users,
  Maximize,
  Wifi,
  Coffee,
  Tv,
  Wind,
  Heart,
} from "lucide-react";

interface RoomCardProps {
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  price: number;
  originalPrice?: number;
  features?: string[];
}

export function RoomCard({
  name,
  image,
  rating,
  reviews,
  location,
  price,
  originalPrice,
  features = ["Free WiFi", "Air Conditioning", "TV", "Mini Bar"],
}: RoomCardProps) {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="relative">
            <img src={image} alt={name} className="w-full h-56 object-cover" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
            >
              <Heart
                className={`h-5 w-5 ${
                  liked ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </motion.button>
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold mb-1">{name}</h3>
                <p className="text-xs text-gray-600">{location}</p>
              </div>
              <Badge className="bg-blue-600 text-white border-0">
                <Star className="h-3 w-3 mr-1 fill-white" />
                {rating}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mb-3">{reviews} reviews</p>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                {originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    AZN {originalPrice}
                  </span>
                )}
                <span className="text-lg font-semibold">AZN {price}</span>
                <span className="text-xs text-gray-500">/ night</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{name}</DialogTitle>
            <DialogDescription>{location}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <Badge className="bg-blue-600 text-white border-0 px-3 py-1">
                <Star className="h-4 w-4 mr-1 fill-white" />
                {rating} Rating
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                {reviews} Reviews
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Room Features</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                  <Wifi className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Free WiFi</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                  <Wind className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Air Conditioning</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                  <Tv className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Smart TV</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                  <Coffee className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Mini Bar</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                  <Maximize className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">35 m² Space</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Up to 2 Guests</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Experience luxury and comfort in our beautifully appointed room.
                Each room features modern amenities, elegant decor, and stunning
                views. Enjoy complimentary WiFi, premium bedding, and 24/7 room
                service. Perfect for both business and leisure travelers.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                {originalPrice && (
                  <span className="text-sm text-gray-400 line-through block">
                    AZN {originalPrice}
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">AZN {price}</span>
                  <span className="text-gray-500">per night</span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Book Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
