import { Outlet } from "react-router-dom";
import CategorySection from "../../components/categorySection/categorySection";
import GuestHeader from "../../components/header/GuestHeader";
import Intro from "../../pages/Home/Intro";
import DestinationsPage from "./Destinations/DestinationsPage";
import PastOffers from "./PastOffers/PastOffers";
const Home = () => {
  return (
    <>
      <GuestHeader />

      <CategorySection />
      <Intro />
      {/* <DestinationsPage /> */}
      {/* <PastOffers /> */}

      {/* additional component */}
      {/* FIXME:  improve style and add upload image for background*/}
      {/* <div
        className="w-full mb-48 h-[400px] mt-10 relative"
        style={{
          backgroundImage: "url('/backgroundImg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
          <p className="text-[20px] sm:text-[28px] lg:text-[40px] transition-all text-white font-bold absolute top-11 left-13 flex flex-col">
            <span>Get Inspirations For Your Next Trip</span>
            <span className="text-[14px] sm:text-[18px] lg:text-[20px] font-normal w-3/4 lg:w-full lg:font-semibold">
              Read About Wonderful Adventure We Love Most
            </span>
          </p>
          <p className="flex flex-col text-[22px] sm:text-[32px] md:text-[38px] lg:text-[40px] text-white font-bold w-[90%] sm:w-[60%] lg:w-[40%] text-end absolute bottom-11 right-13">
            <span>Difficult Roads Lead To Beautiful Destination.</span>
            <span className="text-[18px] font-normal cursor-pointer transition-all duration-500 hover:scale-x-95">
              Read More {">"}
            </span>
          </p>
      </div> */}
      <Outlet />
    </>
  );
};

export default Home;
