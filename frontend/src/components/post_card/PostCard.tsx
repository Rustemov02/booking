import { FC } from "react";

const PostCard: FC<{
  image: any;
  city: string;
  Flag: any;
  children: React.ReactNode;
}> = ({ image, children }) => {
  return (
    <section
      className={`w-full h-auto max-h-[270px] relative rounded-xl overflow-hidden transition duration-500 border border-transparent hover:border-[yellow] cursor-pointer`}
    >
      <img src={image} alt="postImg" className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
      <div
        className={`absolute top-4 left-4 flex items-center gap-4 text-[24px] font-bold `}
      >
        {children}
      </div>
    </section>
  );
};

export default PostCard;
