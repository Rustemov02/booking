import { ReactNode } from "react";
import GuestHeader from "../components/header/GuestHeader";
import Footer from "./Footer/Footer";
import CategorySection from "../components/categorySection/categorySection";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="">
      <GuestHeader />
      {/* <CategorySection /> */}
      {children}
      <Footer />
    </main>
  );
};

export default PageLayout;
