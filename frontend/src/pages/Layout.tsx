import { ReactNode, useEffect } from "react";
import GuestHeader from "../components/header/GuestHeader";
import Footer from "./Footer/Footer";
import CategorySection from "../components/categorySection/categorySection";
import apiRequest from "../api/apiRequest";

const PageLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const response = apiRequest({
      method: "GET",
      url: "api/data",
      onError: (err) => console.log(err),
      onSuccess: () => console.log("Completed"),
    });

    console.log(response);
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
