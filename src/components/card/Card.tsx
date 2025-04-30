import { useState } from "react";
import Cup from "../../assets/images/cup.jpg";
import HeartIcon from "../../assets/svg/like.svg?react";
import Sun from "../../assets/svg/sun.svg?react";

const Card = () => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="p-2 pb-6 gap-2 rounded-[8px] bg-white border border-neutral-300 flex flex-col max-w-[240px] h-auto max-h-[420px]">
      {/* IMAGE  */}
      <div className="relative">
        <img src={Cup} alt="cardImage" className="rounded-t-[4px] w-full" />
        <span
          className="absolute top-2 left-2 cursor-pointer"
          style={{ stroke: "red" }}
        >
          <HeartIcon
            style={isSaved ? { fill: "black" } : { fill: "none" }}
            onClick={toggleSave}
          />
        </span>

        <div className="absolute bottom-0 w-full h-[40px] bg-black opacity-50 flex flex-row justify-center">
          <div className="absolute left-0 top-1 flex flex-row items-center justify-between w-full px-2">
            <div className="flex flex-row items-center gap-3">
              <span style={{ scale: "1.4" }}>
                <Sun />
              </span>
              <span style={{ scale: "1.4" }}>
                <Sun />
              </span>
              <span style={{ scale: "1.4" }}>
                <Sun />
              </span>
            </div>
            <span className="border-2 border-white text-white p-1 rounded-[4px]">
              8,2
            </span>
          </div>
        </div>
      </div>
      {/* TITLE */}
      <div>
        <p className="text-[20px] font-bold text-[#000]">Berlin</p>
        <span className="text-neutral-700 text-[16px] font-semibold">SIDE</span>
      </div>
      {/* DATE */}
      <span className="text-[12px] font-medium text-[#000]">Wed 25 Jan-Fri 27 Jan</span>

      <p className="text-neutral-950 text-[10px] font-[300]">A Tour Of The City And Its Surroundings Led By A Professional Guide</p>
    </div>
  );
};

export default Card;
