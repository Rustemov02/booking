import { useEffect, useState } from "react";
import apiRequest from "../../../api/apiRequest";
import Card from "../../../components/card/Card";
import PageHeader from "../../../components/pageHeader/PageHeader";
import getRoutes from "../../../modules";
import { CardTypes, RoomTypes } from "../../../types";

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

  const handleSetRoomsData = async (status: boolean, id?: string) => {
    //  FIXME: you should export isSaved status from Card
    // so you don't need find or filter method anymore


    console.log(status);

    // const selectedRoom = rooms.find((item: any) => item?._id === id) as
    //   | RoomTypes
    //   | undefined;

    // if (!selectedRoom) return;

    // const newIsSaved = !selectedRoom.isSaved;

    // setRooms((prev: any) =>
    //   prev.map((item: any) =>
    //     item._id === id ? { ...item, isSaved: newIsSaved } : item
    //   )
    // );
    // try {
    //   const response = await apiRequest({
    //     method: "PATCH",
    //     url: `/api/rooms/${id}`,
    //     data: { isSaved: newIsSaved },
    //     onError: (err) => console.log("ERROR : ", err),
    //   });
    //   console.log("PATCH RESPONSE : ", response);
    // } catch (err) {
    //   console.log("Error : ", err);
    // }
  };

  useEffect(() => console.log(rooms), [rooms]);

  // FOR CARD DETAILS
  const handleRequest = async () => {};
  return (
    <div className="pt-24 px-4 py-6 space-y-4 w-full max-w-[1220px] m-auto">
      <PageHeader title="Explore Stay in Trending Destinations" />
      <div className="text- font-semibold text-[#000]">Find Hot Stays</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] items-center flex-wrap gap-6">
        {rooms?.map((card: any) => (
          <Card
            onClick={handleRequest}
            basePath={routes.destinationDetail}
            setIsSaved={(isSaved) => handleSetRoomsData(isSaved)} //temporary
            data={card}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
