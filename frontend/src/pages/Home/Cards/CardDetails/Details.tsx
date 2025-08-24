import { useEffect } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../../../../api/apiRequest";

const CardDetails = () => {
  const { id } = useParams();

  const getCardDetails = async () => {
    try {
      const response = await apiRequest({
        method: "GET",
        url: `/api/rooms/${id}`,
      });

      console.log(response);
    } catch (err) {
      console.log("ROOMS FETCHING ERROR : ", err);
    }
  };

  useEffect(() => {
    getCardDetails();
  }, []);

  return <div>COming soon...</div>;
};

export default CardDetails;
