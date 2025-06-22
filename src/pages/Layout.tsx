import { ReactNode } from "react";
import GuestHeader from "../components/header/GuestHeader";
import Footer from "./Footer/Footer";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <GuestHeader />
      {children}
      <Footer />
    </>
  );
};

export default PageLayout;
