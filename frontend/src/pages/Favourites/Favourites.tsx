import Card from "../../components/card/Card";
import apiRequest from "../../api/apiRequest";
import { useEffect, useState } from "react";
import { CardDataTypes } from "../../types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import Button from "../../components/button/Button";

const FavouritesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [favouritesRooms, setFavouritesRooms] = useState<CardDataTypes[]>([]);

  const fetchFavourites = async () => {
    try {
      const response = await apiRequest({
        method: "GET",
        url: "/api/rooms/favourites",
        onError: (err) => console.log(err),
      });
 
      setFavouritesRooms(response.rooms || []);
    } catch (err) {
      console.log("ERROr : ", err);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);
 
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          {t("nav.favourites")}
        </h1>
        <p className="text-gray-500">
          Your collection of saved hotels and stays
        </p>
      </div>

      {favouritesRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favouritesRooms.map((item: CardDataTypes) => (
            <Card key={item._id} data={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No favourites yet</h2>
          <p className="text-gray-500 max-w-sm mx-auto px-4">
            Start exploring and save your favorite stays here to find them easily later.
          </p>
          <Button
            className="mt-6 bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-2.5 h-auto transition-all shadow-lg shadow-red-100"
            onClick={() => navigate("/hotel")}
          >
            Explore Hotels
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
