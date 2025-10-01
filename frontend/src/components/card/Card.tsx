import { FC } from "react";
import Cup from "../../assets/images/cup.jpg";
import Room from "@/assets/images/Photo 3.png";
import HeartIcon from "../../assets/svg/like.svg?react";
import { CardTypes } from "../../types";
import apiRequest from "../../api/apiRequest";
import ArrowRight from "@/assets/svg/ArrowRight.svg?react";

const Card: FC<CardTypes> = ({
  onClick,
  basePath,
  position = "vertical",
  version = "grid",
  className = "",
  setData,
  data,
}) => {
  if (!data) return null;

  const { _id, name, text, date, description, isSaved } = data;

  const toggleSave = async (e: any) => {
    e.stopPropagation();
    setData?.((prev: any) =>
      prev.map((item: any) =>
        item._id === _id ? { ...item, isSaved: !isSaved } : item
      )
    );
    try {
      await apiRequest({
        method: "PATCH",
        url: `/api/rooms/${_id}`,
        data: { isSaved: !isSaved },
        onError: (err) => console.log("ERROR : ", err),
      });
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  const handleRoute = () => {
    onClick?.(_id);
    if (!basePath) return;
  };

  const CardImage = ({ src }: { src: string }) => (
    <div className="relative">
      <img src={src} alt="cardImage" className="w-full aspect-6/5 rounded-xl" />
      <span className="fixed top-2 right-2 flex items-center justify-center cursor-pointer z-100 w-[36px] h-[36px] rounded-full bg-white">
        <HeartIcon
          style={isSaved ? { fill: "black" } : { fill: "none" }}
          onClick={toggleSave}
        />
      </span>
    </div>
  );

  const GridVersion = () => (
    <div
      onClick={handleRoute}
      className={`${
        version === "grid" ? "flex" : "flex md:hidden"
      } group relative rounded-xl overflow-hidden shadow-lg shadow-gray-400 w-full h-auto flex-col items-start cursor-pointer transition-all duration-500 scale-100 hover:scale-102 ${className}`}
    >
      <CardImage src={Room} />
      <div className="w-full p-2 flex flex-col gap-1">
        <div>
          <div className="text-[16px] font-semibold line-clamp-2">{name}</div>
          <span className="text-[12px] text-[#595959] font-normal">{text}</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="border w-fit font-bold text-white bg-[#003B95] rounded-xl rounded-bl-none flex items-center justify-center p-2">
            8.8
          </span>
          <div className="flex flex-col">
            <span className="text-[#1A1A1A] text-[12px] font-semibold">
              Fabulous
            </span>
            <span className="text-[#595959] text-[12px] font-bold">
              3,281 reviews
            </span>
          </div>
        </div>

        <div className="w-full flex justify-end mt-6">
          <div className="text-[12px] flex items-center gap-1">
            Starting from
            <span className="text-[16px] text-[#1A1A1A] font-bold">
              AZN 321
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const ListVersion = () => (
    <div
      className={`${
        version === "list" ? "hidden md:grid" : "hidden"
      } grid-cols-[auto_1fr] w-full border rounded-xl border-[#e7e7e7] bg-white items-start justify-start gap-4 p-4`}
    >
      <div className="w-full max-w-[260px] h-[260px]">
        <CardImage src={Room} />
      </div>

      <div className="grid grid-row-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start justify-between gap-6 h-[calc(100%-40px)]">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[#006CE4] font-bold text-[20px] truncate w-full">
              {name}
            </p>
            <span>Old Town , Poland , Krakow</span>
            <span>300 m from center</span>
          </div>
          <div className="border-l border-[gray] pl-3 w-2/3">
            <span className="text-[12px] font-bold">Superior apartment</span>
            <div className="*:text-[12px] *:font-normal">
              <span>Entire apartment</span> • <span>1 bedroom</span> •{" "}
              <span>1 living room</span> • <span>1 kitchen</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between h-full">
          <div className="flex items-center flex-row-reverse gap-2">
            <span className="border w-fit font-bold text-white bg-[#003B95] rounded-xl rounded-bl-none flex items-center justify-center p-2">
              8.8
            </span>
            <div className="flex flex-col items-end">
              <span className="text-[#1A1A1A] text-[16px] font-semibold">
                Exceptional
              </span>
              <span className="text-[#595959] text-[12px] font-bold">
                119 reviews
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span>1 night , 2 adults</span>
            <span>AZN 503</span>
            <span>Includes taxes and charges</span>
          </div>

          <div
            onClick={handleRoute}
            className="p-2 rounded-lg bg-[blue] text-white font-semibold flex items-center gap-2 cursor-pointer"
          >
            <span>See availability</span>
            <ArrowRight className="w-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <GridVersion />
      <ListVersion />
    </>
  );
};

export default Card;
