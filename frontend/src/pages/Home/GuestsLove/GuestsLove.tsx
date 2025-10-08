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
    console.log("CARD ID: ", id);
    navigate(`rooms/${id}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 space-y-8 w-full max-w-[1220px] mx-auto">
      <PageHeader title="Homes guests love" />

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {rooms?.map((card: any) => (
          <Card
            key={card.id}
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
        {rooms?.map((card: any) => (
          <Card
            key={`${card.id}-2`}
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
        {rooms?.map((card: any) => (
          <Card
            key={`${card.id}-3`}
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
        {rooms?.map((card: any) => (
          <Card
            key={`${card.id}-4`}
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
        {rooms?.map((card: any) => (
          <Card
            key={`${card.id}-5`}
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setData={setRooms}
            data={card}
            version="grid"
          />
        ))}
        {rooms?.map((card: any) => (
          <Card
            key={`${card.id}-6`}
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
