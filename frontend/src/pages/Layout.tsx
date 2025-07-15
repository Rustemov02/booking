import { ReactNode } from "react";
import GuestHeader from "../components/header/GuestHeader";
import Footer from "./Footer/Footer";
import CategorySection from "../components/categorySection/categorySection";

const PageLayout = ({ children }: { children: ReactNode }) => {
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
