import { FC } from "react";

const PostCard: FC<{
  image: any;
  city: string;
  Flag: any;
  children: React.ReactNode;
}> = ({ image, children }) => {
  return (
    <section className="group relative w-full h-[200px] sm:h-[240px] md:h-[270px] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:shadow-xl cursor-pointer">
      {/* Image */}
      <img 
        src={image} 
        alt="destination" 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold">
        {children}
      </div>
    </section>
  );
};

export default PostCard;