import { ReactNode, useEffect } from "react";
import GuestHeader from "../components/header/GuestHeader";
import Footer from "./Footer/Footer";
import CategorySection from "../components/categorySection/categorySection";
import apiRequest from "../api/apiRequest";

const PageLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest({
        method: "POST",
        url: "api/rooms/search",
        data: {
          checkIn: "2025-07-01",
          checkOut: "2025-07-06",
          adults: 2,
          children: 1,
          rooms: 2,
        },
        onError: (err) => console.log(err),
        onSuccess: () => console.log("Data FETCHED !"),
      });

      console.log(response);
    };

    fetchData();
  }, []);

  return (
    <>
      <GuestHeader />
      <CategorySection />
      {children}
      <Footer />
    </>
  );
};

export default PageLayout;
