import { FC, useState } from "react";
import Cup from "../../assets/images/cup.jpg";
import Room from "@/assets/images/Photo 3.png";
import HeartIcon from "../../assets/svg/like.svg?react";
import Sun from "../../assets/svg/sun.svg?react";
import { CardTypes } from "../../types";
import Breakfast from "../../assets/svg/breakfast.svg?react";
import People from "../../assets/svg/people.svg?react";
import apiRequest from "../../api/apiRequest";

const Card: FC<CardTypes> = ({
  onClick,
  basePath,
  position = "vertical", // vertical - Y line ; horizontal - X line
  version = "grid",
  className = "",
  setIsSaved,
  personCount,
  data,
  setData,
}) => {
  if (!data) return;
  const {
    _id,
    name,
    text,
    rating,
    date,
    hasBreakfast = false,
    // price,
    description,
    isSaved,
  } = data;

  const handleSetRoomsData = async () => {
    setData?.((prev: any) =>
      prev.map((item: any) =>
        item._id === _id ? { ...item, isSaved: !isSaved } : item
      )
    );
    try {
      const response = await apiRequest({
        method: "PATCH",
        url: `/api/rooms/${_id}`,
        data: { isSaved: !isSaved },
        onError: (err) => console.log("ERROR : ", err),
      });
      console.log("PATCH RESPONSE : ", response);
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  const toggleSave = (e: any) => {
    e.stopPropagation();
    // setIsSaved?.(!isSaved, data?._id);
    handleSetRoomsData();
  };

  const handleRoute = () => {
    onClick?.(_id);
    if (!basePath) return;
    if (typeof basePath === "function") {
      // navigate(basePath(id.toString()));
    } else {
      // navigate(`${basePath}/${id}`);
    }
  };
  const GridVersion = () => {
    return (
      // <div
      //   onClick={handleRoute}
      //   className={`gap-2 rounded-[8px] transition-all duration-300 hover:opacity-80 bg-white border border-neutral-300 flex ${
      //     position === "horizontal"
      //       ? "flex-row w-full items-center p-2 !h-[200px]"
      //       : "flex-col max-w-[270px] max-h-[420px] p-2 pb-6 "
      //   } h-auto  cursor-pointer ${className}`}
      // >
      //   {/* IMAGE  */}
      //   <div className="relative">
      //     <img
      //       src={Cup}
      //       alt="cardImage"
      //       className={`rounded-t-[4px] ${
      //         position === "horizontal" ? "w-[250px] !h-[180px] " : "w-full"
      //       } `}
      //     />
      //     <span
      //       className="absolute top-2 left-2 cursor-pointer z-100"
      //       style={{ stroke: "red" }}
      //     >
      //       <HeartIcon
      //         style={isSaved ? { fill: "black" } : { fill: "none" }}
      //         onClick={toggleSave}
      //       />
      //     </span>

      //     <div className="absolute bottom-0 w-full h-[40px] bg-black opacity-50 flex flex-row justify-center">
      //       <div className="absolute left-0 top-1 flex flex-row items-center justify-between w-full px-2">
      //         <div className="flex flex-row items-center gap-3">
      //           <span style={{ scale: "1.4" }}>
      //             <Sun />
      //           </span>
      //           <span style={{ scale: "1.4" }}>
      //             <Sun />
      //           </span>
      //           <span style={{ scale: "1.4" }}>
      //             <Sun />
      //           </span>
      //         </div>
      //         <span className="border-2 border-white text-white p-1 rounded-[4px]">
      //           {rating}
      //         </span>
      //       </div>
      //     </div>
      //   </div>

      //   {position === "horizontal" ? (
      //     <div className="h-full p-4 w-full">
      //       {/* TITLE */}
      //       <div>
      //         <p className="text-[20px] font-bold text-[#000]">{name}</p>
      //         <span className="text-neutral-700 text-[16px] font-semibold">
      //           {text}
      //         </span>
      //       </div>
      //       <div>
      //         {hasBreakfast && (
      //           <p className="flex flex-row items-center gap-[8px] text-[#565656] text-[12px]">
      //             <span>
      //               <Breakfast />
      //             </span>
      //             Breakfast Included
      //           </p>
      //         )}
      //         {personCount && (
      //           <p className="flex flex-row items-center gap-[8px] text-[#565656] text-[12px] !mt-0">
      //             <span>
      //               <People />
      //             </span>{" "}
      //             1 Adult , 2 Children
      //           </p>
      //         )}
      //       </div>
      //       {/* DATE */}
      //       <span className="text-[12px] font-medium text-[#000]">{date}</span>

      //       <p className="text-neutral-950 text-[10px] font-[300]">
      //         {description}
      //       </p>
      //     </div>
      //   ) : (
      //     <div className="h-full">
      //       {/* TITLE */}
      //       <div>
      //         <p className="text-[20px] font-bold text-[#000]">{name}</p>
      //         <span className="text-neutral-700 text-[16px] font-semibold">
      //           {text}
      //         </span>
      //       </div>
      //       {/* DATE */}
      //       <span className="text-[12px] font-medium text-[#000]">{date}</span>

      //       <p className="text-neutral-950 text-[10px] font-[300]">
      //         {description}
      //       </p>
      //     </div>
      //   )}
      // </div>

      <div
        onClick={handleRoute}
        className={`${
          version === "grid" ? "flex" : "hidden"
        }  relative rounded-xl overflow-hidden shadow-lg shadow-gray-200 w-[270px] h-auto flex-col items-start cursor-pointer transition-all duration-500 hover:scale-102`}
      >
        <div className="relative">
          <img src={Room} alt="cardImage" className={`w-full aspect-6/5`} />
          <span
            className="absolute top-2 right-2 flex items-center justify-center cursor-pointer z-100 w-[36px] h-[36px] border rounded-full bg-white "
            style={{ stroke: "red" }}
          >
            <HeartIcon
              style={isSaved ? { fill: "black" } : { fill: "none" }}
              onClick={toggleSave}
            />
          </span>
        </div>
        <div className={`w-full p-2 flex flex-col gap-1`}>
          <div>
            <div className="text-[16px] font-semibold">
              Aparthotel Staer Miasto
            </div>
            <span className="text-[12px] text-[#595959] font-normal">
              Old Town , Poland , Krakow
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`border w-fit font-bold text-white bg-[#003B95]  rounded-xl rounded-bl-none flex items-center justify-center p-2`}
            >
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
            <div className="text-[12px] flex items-center gap-1 ">
              Starting from
              <span className="text-[16px] text-[#1A1A1A] font-bold">
                AZN 321
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ListVersion = () => {
    return (
      <div
        className={`${
          version === "list" ? "grid" : "hidden"
        } grid-cols-[auto_1fr] w-full border rounded-xl border-[#e7e7e7]  bg-white items-start justify-start  gap-4 p-4`}
      >
        {/* IMG */}
        <div className={`w-[240px] relative`}>
          <img  
            src={Room}
            alt="room"
            className="h-full w-full rounded-xl border border-[red]"
          />
          <span
            className="absolute top-2 right-2 flex items-center justify-center cursor-pointer z-100 w-[36px] h-[36px] border rounded-full bg-white "
            style={{ stroke: "red" }}
          >
            <HeartIcon
              style={isSaved ? { fill: "black" } : { fill: "none" }}
              onClick={toggleSave}
            />
          </span>
        </div>

        {/* CONTAINER */}
        <div>
          {/* Left side */}
          <div>
            <div>
              <p className="text-[#006CE4] font-bold text-[20px]">
                TOM PRIVATE room
              </p>
              <span> Old Town , Poland , Krakow</span>
              <span>300 m from center</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <GridVersion />
      <ListVersion />
    </>
  );
};

export default Card;
