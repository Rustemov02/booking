import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

interface DestinationCardProps {
  name: string;
  image: string;
  tag?: string;
}

export function DestinationCard({ name, image, tag }: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group h-48"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {tag && (
        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
          {tag}
        </Badge>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg font-semibold">{name}</h3>
      </div>
    </motion.div>
  );
}