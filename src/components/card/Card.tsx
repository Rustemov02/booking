import Cup from "../../assets/images/cup.jpg";
import HeartIcon from "../../assets/svg/like.svg?react";

const Card = () => {
  return (
    <div className="p-2 pb-6 rounded-[8px] bg-white border border-neutral-300 flex flex-col max-w-[350px] h-auto">
      <div className="relative">
        <img src={Cup} alt="cardImage" className="rounded-t-[4px]" />
        <span className="absolute top-2 left-2" style={{ stroke: "red" }}>
          <HeartIcon style={{ fill: "none" }} />
        </span>
      </div>
    </div>
  );
};

export default Card;
