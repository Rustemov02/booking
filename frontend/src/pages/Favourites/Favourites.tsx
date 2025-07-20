import Card from "../../components/card/Card";
import PageHeader from "../../components/pageHeader/PageHeader";
import apiRequest from "../../api/apiRequest";
import { useEffect, useState } from "react";
import { CardDataTypes } from "../../types";

const FavouritesPage = () => {
  const [favouritesRooms, setFavouritesRooms] = useState<CardDataTypes[]>([]);

  const fetchFavourites = async () => {
    try {
      const response = await apiRequest({
        method: "GET",
        url: "/api/rooms/favourites",
        onError: (err) => console.log(err),
      });

      console.log(response);
      setFavouritesRooms(response.rooms);
    } catch (err) {
      console.log("ERROr : ", err);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  console.log(favouritesRooms);
  return (
    <div className="container pt-10 flex flex-col gap-6">
      <PageHeader title="Hotel Favourites" />

      <div className="grid grid-cols-3 gap-6">
        {favouritesRooms.map((item: CardDataTypes) => (
          <Card data={item} />
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
