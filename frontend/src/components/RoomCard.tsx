import { useState, useCallback } from "react";
import {
  Star,
  Users,
  Maximize,
  Wifi,
  Coffee,
  Tv,
  Wind,
  Heart,
  X,
  MapPin,
} from "lucide-react";

// Types
interface RoomFeature {
  icon: React.ReactNode;
  label: string;
}

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

// Room Features Data
const getRoomFeatures = (): RoomFeature[] => [
  { icon: <Wifi className="h-5 w-5 text-blue-600" />, label: "Free WiFi" },
  {
    icon: <Wind className="h-5 w-5 text-blue-600" />,
    label: "Air Conditioning",
  },
  { icon: <Tv className="h-5 w-5 text-blue-600" />, label: "Smart TV" },
  { icon: <Coffee className="h-5 w-5 text-blue-600" />, label: "Mini Bar" },
  {
    icon: <Maximize className="h-5 w-5 text-blue-600" />,
    label: "35 m² Space",
  },
  {
    icon: <Users className="h-5 w-5 text-blue-600" />,
    label: "Up to 2 Guests",
  },
];

// Dialog Component WITH ANIMATION
const Dialog = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {children}
      </div>
    </div>
  );
};

// Badge Component
const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) => {
  const baseStyles =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";
  const variantStyles =
    variant === "outline"
      ? "border border-gray-300 text-gray-700 bg-white"
      : "bg-blue-600 text-white";

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </span>
  );
};

// Main Room Card Component
export function RoomCard({
  name,
  image,
  rating,
  reviews,
  location,
  price,
  originalPrice,
}: RoomCardProps) {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const roomFeatures = getRoomFeatures();

  const handleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
  }, []);

  const handleCardClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleBookNow = useCallback(() => {
    console.log(`Booking ${name} for AZN ${price}/night`);
    // Handle booking logic
  }, [name, price]);

  return (
    <>
      {/* Card */}
      <div
        onClick={handleCardClick}
        className="cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Image Section */}
          <div className="relative h-56 bg-gray-200">
            <img
              src={image}
              alt={name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />

            {/* Favorite Button */}
            <button
              onClick={handleLike}
              className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              aria-label={liked ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`h-5 w-5 transition-all duration-300 ${
                  liked ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>
          </div>

          {/* Content Section */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 pr-2">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {name}
                </h3>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{location}</p>
                </div>
              </div>
              <Badge>
                <Star className="h-3 w-3 mr-1 fill-white" />
                {rating}
              </Badge>
            </div>

            <p className="text-xs text-gray-500 mb-3">
              {reviews.toLocaleString()} reviews
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-baseline gap-1">
                {originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    AZN {originalPrice}
                  </span>
                )}
                <span className="text-lg font-bold text-gray-900">
                  AZN {price}
                </span>
                <span className="text-xs text-gray-500">/ night</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Modal */}
      <Dialog open={open} onClose={handleClose}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="h-4 w-4" />
              <p className="text-sm">{location}</p>
            </div>
          </div>

          {/* Large Image */}
          <div className="relative rounded-xl overflow-hidden bg-gray-200">
            <img
              src={image}
              alt={name}
              className="w-full h-96 object-cover"
              loading="lazy"
            />
          </div>

          {/* Badges */}
          <div className="flex items-center gap-4 flex-wrap">
            <Badge>
              <Star className="h-4 w-4 mr-1 fill-white" />
              {rating} Rating
            </Badge>
            <Badge variant="outline">{reviews.toLocaleString()} Reviews</Badge>
          </div>

          {/* Room Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Room Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {roomFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {feature.icon}
                  <span className="text-sm font-medium text-gray-700">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Experience luxury and comfort in our beautifully appointed room.
              Each room features modern amenities, elegant decor, and stunning
              views. Enjoy complimentary WiFi, premium bedding, and 24/7 room
              service. Perfect for both business and leisure travelers.
            </p>
          </div>

          {/* Price and Book Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through block mb-1">
                  AZN {originalPrice}
                </span>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  AZN {price}
                </span>
                <span className="text-gray-500">per night</span>
              </div>
            </div>
            <button
              onClick={handleBookNow}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Now
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}