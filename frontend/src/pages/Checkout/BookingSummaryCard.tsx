import { Star, Users, Calendar, MapPin } from "lucide-react";
import { Separator } from "../../components/ui/separator";

interface BookingSummaryCardProps {
  hotelName: string;
  roomName: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  pricePerNight: number;
}

export function BookingSummaryCard({
  hotelName,
  roomName,
  image,
  rating,
  reviews,
  location,
  guests,
  checkIn,
  checkOut,
  nights,
  pricePerNight,
}: BookingSummaryCardProps) {
  const subtotal = pricePerNight * nights;
  const taxesAndFees = subtotal * 0.15; // 15% taxes and fees
  const total = subtotal + taxesAndFees;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm sticky top-24">
      <h3 className="text-xl text-neutral-900 mb-6">Booking Summary</h3>

      {/* Room Image */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-5">
        <img
          src={image}
          alt={roomName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hotel & Room Info */}
      <div className="mb-5">
        <h4 className="text-lg text-neutral-900 mb-1">{hotelName}</h4>
        <p className="text-neutral-600 mb-3">{roomName}</p>

        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-neutral-500" />
          <span className="text-sm text-neutral-600">{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-neutral-200 text-neutral-200"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-neutral-600">
            {rating} ({reviews} reviews)
          </span>
        </div>
      </div>

      <Separator className="my-5 bg-neutral-100" />

      {/* Booking Details */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-neutral-500" />
          <div className="flex-1">
            <p className="text-sm text-neutral-500">Check-in</p>
            <p className="text-neutral-900">{checkIn}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-neutral-500" />
          <div className="flex-1">
            <p className="text-sm text-neutral-500">Check-out</p>
            <p className="text-neutral-900">{checkOut}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="h-4 w-4 text-neutral-500" />
          <div className="flex-1">
            <p className="text-sm text-neutral-500">Guests</p>
            <p className="text-neutral-900">
              {guests} {guests === 1 ? "Guest" : "Guests"}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-5 bg-neutral-100" />

      {/* Price Breakdown */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">
            ${pricePerNight} × {nights} {nights === 1 ? "night" : "nights"}
          </span>
          <span className="text-neutral-900">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Taxes & fees</span>
          <span className="text-neutral-900">${taxesAndFees.toFixed(2)}</span>
        </div>
      </div>

      <Separator className="my-5 bg-neutral-100" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-lg text-neutral-900">Total</span>
        <span className="text-2xl text-neutral-900">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
