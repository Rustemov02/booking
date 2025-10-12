import { useState } from "react";
import { Slider } from "../../components/ui/slider";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Star, X } from "lucide-react";
import { motion } from "framer-motion";

interface FilterSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({
  onClose,
  isMobile = false,
}: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const roomTypes = [
    { id: "standard", label: "Standard Room" },
    { id: "deluxe", label: "Deluxe Room" },
    { id: "suite", label: "Suite" },
    { id: "penthouse", label: "Penthouse" },
  ];

  const amenities = [
    { id: "wifi", label: "Free WiFi" },
    { id: "parking", label: "Free Parking" },
    { id: "pool", label: "Swimming Pool" },
    { id: "gym", label: "Gym/Fitness Center" },
    { id: "spa", label: "Spa" },
    { id: "restaurant", label: "Restaurant" },
    { id: "breakfast", label: "Breakfast Included" },
    { id: "ac", label: "Air Conditioning" },
    { id: "pets", label: "Pet Friendly" },
  ];

  const toggleRating = (rating: number) => {
    setSelectedRating((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const toggleRoomType = (type: string) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedRating([]);
    setSelectedRoomTypes([]);
    setSelectedAmenities([]);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 h-fit sticky top-24 shadow-sm">
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg text-neutral-900">Filters</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg text-neutral-900">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
        >
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <Label className="mb-4 block text-neutral-700">Price Range</Label>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <span className="px-3 py-1.5 bg-neutral-50 rounded-lg">
            ${priceRange[0]}
          </span>
          <span className="text-neutral-400">—</span>
          <span className="px-3 py-1.5 bg-neutral-50 rounded-lg">
            ${priceRange[1]}+
          </span>
        </div>
      </div>

      <Separator className="my-8 bg-neutral-100" />

      {/* Star Rating */}
      <div className="mb-8">
        <Label className="mb-4 block text-neutral-700">Star Rating</Label>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <motion.div
              key={rating}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => toggleRating(rating)}
            >
              <Checkbox
                checked={selectedRating.includes(rating)}
                onCheckedChange={() => toggleRating(rating)}
                className="border-neutral-300"
              />
              <div className="flex items-center gap-1.5">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator className="my-8 bg-neutral-100" />

      {/* Room Type */}
      <div className="mb-8">
        <Label className="mb-4 block text-neutral-700">Room Type</Label>
        <div className="space-y-3">
          {roomTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => toggleRoomType(type.id)}
            >
              <Checkbox
                checked={selectedRoomTypes.includes(type.id)}
                onCheckedChange={() => toggleRoomType(type.id)}
                className="border-neutral-300"
              />
              <Label className="cursor-pointer text-neutral-600 group-hover:text-neutral-900 transition-colors">
                {type.label}
              </Label>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator className="my-8 bg-neutral-100" />

      {/* Amenities */}
      <div className="mb-8">
        <Label className="mb-4 block text-neutral-700">Amenities</Label>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {amenities.map((amenity) => (
            <motion.div
              key={amenity.id}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => toggleAmenity(amenity.id)}
            >
              <Checkbox
                checked={selectedAmenities.includes(amenity.id)}
                onCheckedChange={() => toggleAmenity(amenity.id)}
                className="border-neutral-300"
              />
              <Label className="cursor-pointer text-neutral-600 group-hover:text-neutral-900 transition-colors">
                {amenity.label}
              </Label>
            </motion.div>
          ))}
        </div>
      </div>

      <Button className="w-full bg-teal-600 hover:bg-teal-700 rounded-xl">
        Apply Filters
      </Button>
    </div>
  );
}
