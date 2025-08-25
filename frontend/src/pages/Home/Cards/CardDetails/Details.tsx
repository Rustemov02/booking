import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../../../../api/apiRequest";
import room1 from "../../../../assets/images/Photo 1.png";
import room2 from "../../../../assets/images/Photo 2.png";
import room3 from "../../../../assets/images/Photo 2-1.png";
import room4 from "../../../../assets/images/Photo 3.png";

const CardDetails = () => {
  const [room, setRoom] = useState<any>();
  const { id } = useParams();

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

  return (
    <div className="container pt-16">
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

      <div>
        <p>{room?.explanation}</p>
      </div>
      <div>
        {room?.services?.map((service: any) => (
          <p>{service}</p>
        ))}
      </div>
    </div>
  );
};

export default CardDetails;
