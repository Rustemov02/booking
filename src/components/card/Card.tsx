import { useState } from "react";
import Cup from "../../assets/images/cup.jpg";
import HeartIcon from "../../assets/svg/like.svg?react";

const Card = () => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="p-2 pb-6 rounded-[8px] bg-white border border-neutral-300 flex flex-col max-w-[350px] h-auto">
      {/* IMAGE  */}
      <div className="relative">
        <img src={Cup} alt="cardImage" className="rounded-t-[4px] w-full" />
        <span className="absolute top-2 left-2 cursor-pointer" style={{ stroke: "red" }}>
          <HeartIcon style={isSaved ? {fill : "black"} : {fill : 'none'}} onClick={toggleSave} />
        </span>

        <div className="absolute bottom-0 w-full h-[40px] bg-black opacity-50 flex flex-row justify-center">
          <div className="absolute left-0 top-1 flex flex-row items-center justify-between w-full px-2">
            <span className="border-2">O</span>
            <span className="border-2 border-white text-white p-1 rounded-[4px]">
              8,2
            </span>
          </div>
        </div>
      </div>
      {/* TITLE */}
      <div>
        <p>Berlin</p>
        <span>SIDE</span>
      </div>
      {/* DATE */}
      <span>Wed 25 Jan-Fri 27 Jan</span>

      <p>A Tour Of The City And Its Surroundings Led By A Professional Guide</p>
    </div>
  );
};

export default Card;
