import { useEffect, useState } from "react";
import apiRequest from "../../../api/apiRequest";
import Card from "../../../components/card/Card";
import PageHeader from "../../../components/pageHeader/PageHeader";
import getRoutes from "../../../modules";
import { RoomTypes } from "../../../types";
import { useNavigate } from "react-router-dom";

const GuestsLove = () => {
  const routes = getRoutes();

  const [rooms, setRooms] = useState<RoomTypes[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await apiRequest({
          method: "GET",
          url: "/api/rooms/",
          onError: (err) => console.log(err),
          onSuccess: (data) => setRooms(data.rooms),
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => console.log(rooms), [rooms]);

  const navigate = useNavigate();

  // FOR CARD DETAILS
  const handleRequest = async (id: string) => {
    console.log("CARD ID :  ", id);
    navigate(`rooms/${id}`);
  };

  return (
    <div className="pt-24 px-4 py-6 space-y-4 w-full max-w-[1220px] m-auto">
      <PageHeader title="Homes guests love" />
      {/* <div className="text- font-semibold text-[#000]">Find Hot Stays</div> */}
      {/* grid-cols-[repeat(auto-fill,minmax(270px,1fr))] */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-4 items-center flex-wrap gap-6">
        {rooms?.map((card: any) => (
          <Card
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
        {rooms?.map((card: any) => (
          <Card
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
        {rooms?.map((card: any) => (
          <Card
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
        {rooms?.map((card: any) => (
          <Card
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
        {rooms?.map((card: any) => (
          <Card
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
        {rooms?.map((card: any) => (
          <Card
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
      </div>
    </div>
  );
};

export default GuestsLove;
