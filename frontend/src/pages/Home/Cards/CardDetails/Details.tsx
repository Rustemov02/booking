import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../../../../api/apiRequest";
import room1 from "../../../../assets/images/Photo 1.png";
import room2 from "../../../../assets/images/Photo 2.png";
import room3 from "../../../../assets/images/Photo 2-1.png";
import room4 from "../../../../assets/images/Photo 3.png";
import Share from "@/assets/svg/share.svg?react";
import Heart from "@/assets/svg/like.svg?react";
import toast from "react-hot-toast";
import SelectionModal from "../../../../components/modal/SelectionModal";
import InfoModal from "../../../../components/modal/InfoModal";

const CardDetails = () => {
  const [room, setRoom] = useState<any>();
  const { id } = useParams();
  const [isInfoModal, setIsInfoModal] = useState(false);

  const getCardDetails = async () => {
    try {
      const response = await apiRequest({
        method: "GET",
        url: `/api/rooms/${id}`,
      });

      console.log(response.room);
      setRoom(response.room);
    } catch (err) {
      console.log("ROOMS FETCHING ERROR : ", err);
    }
  };

  useEffect(() => {
    getCardDetails();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied !");
    } catch (err) {
      console.log("ERR : ", err);
      toast.success("Link kopyalanmadı !");
    }
  };

  const handleAddFavourites = async () => {
    try {
      await apiRequest({
        method: "PATCH",
        url: `/api/rooms/${id}`,
        data: { isSaved: !room?.isSaved },
        onError: (err) => console.log("ERROR : ", err),
      });

      setRoom((prev: any) => ({ ...prev, isSaved: !room?.isSaved }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container pt-16 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[26px] text-[#222222]">Aparhotel Stare Miasto</p>
        <div className="flex items-center gap-3">
          <div
            onClick={handleCopy}
            className="flex items-center gap-1 cursor-pointer py-2 px-3 rounded-xl hover:bg-[#e4d5d5]"
          >
            <Share />
            <span className="font-semibold">Share</span>
          </div>
          <div
            onClick={handleAddFavourites}
            className="flex items-center gap-1 cursor-pointer py-2 px-3 rounded-xl hover:bg-[#e4d5d5]"
          >
            <Heart
              style={room?.isSaved ? { fill: "black" } : { fill: "none" }}
            />
            <span className="font-semibold">Save</span>
          </div>
        </div>
      </div>
      {/* IMAGES */}
      <div className="flex flex-row items-center gap-5">
        <img src={room1} alt="mainRoom" className="w-[100%] max-w-[520px]" />
        <div className="grid grid-cols-2 gap-3">
          <img src={room2} alt="extraRoom" className="h-[240px] w-[380px]" />
          <img src={room3} alt="extraRoom" className="h-[240px] w-[380px]" />
          <img src={room4} alt="extraRoom" className="h-[240px] w-[380px]" />
          <img src={room4} alt="extraRoom" className="h-[240px] w-[380px]" />
        </div>
      </div>

      {/* <div>
        <p>{room?.explanation}</p>
      </div> */}
      <div>
        <p className="text-[22px] text-[#222222] font-semibold">
          What this place offers
        </p>
        <div className="flex flex-col">
          {room?.services?.map((service: any) => (
            <p className="text-[16px] font-normal">{service}</p>
          ))}
        </div>
        <div
          onClick={() => setIsInfoModal(true)}
          className="bg-[#F2F2F2] w-fit py-[14px] px-6 text-[16px] rounded-xl cursor-pointer font-semibold hover:bg-[#e4d7d7] "
        >
          Show all amenities
        </div>
      </div>

      <InfoModal
        title="About this space"
        isModalOpen={isInfoModal}
        onClose={() => setIsInfoModal(false)}
      >
        {" "}
        fasdfasd
      </InfoModal>
    </div>
  );
};

export default CardDetails;
