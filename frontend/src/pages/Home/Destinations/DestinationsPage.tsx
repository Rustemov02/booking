import { useEffect, useState } from "react";
import apiRequest from "../../../api/apiRequest";
import Card from "../../../components/card/Card";
import PageHeader from "../../../components/pageHeader/PageHeader";
import getRoutes from "../../../modules";
import { CardTypes } from "../../../types";

const DestinationsPage = () => {
  const routes = getRoutes();

  const [rooms, setRooms] = useState([]);

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

  const handleSetRoomsData = async (id: string) => {
    setRooms((prev: any) =>
      prev.map((item: any) =>
        item.id === id ? { ...item, isSaved: !item.isSaved } : item
      )
    );

    try {
      const response = await apiRequest({
        method: 'PATCH',

      })
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  useEffect(() => console.log(rooms), [rooms]);

  // FOR CARD DETAILS
  const handleRequest = async () => {};
  return (
    <div className="pt-24 px-4 py-6 space-y-4 w-full max-w-[1220px] m-auto">
      <PageHeader title="Explore Stay in Trending Destinations" />
      <div className="text- font-semibold text-[#000]">Find Hot Stays</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] items-center flex-wrap gap-6">
        {rooms?.map((item: any) => (
          <Card
            onClick={handleRequest}
            id={item.id}
            price={item.pricePerNight}
            basePath={routes.destinationDetail}
            title={item.name}
            text={item.description}
            rating={3.2}
            desc={item.cancellationPolicy}
            isSaved={item.isSaved}
            setIsSaved={() => handleSetRoomsData(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
