import { Outlet } from "react-router-dom";
import CategorySection from "../../components/categorySection/categorySection";
import GuestHeader from "../../components/header/GuestHeader";
import Intro from "../../pages/Home/Intro";
import GuestsLove from "./GuestsLove/GuestsLove";
import PastOffers from "./TrendingDestinations/TrendingDestinations";
import Footer from "../Footer/Footer";
import TripPlanner from "./TripPlanner/TripPlanner";

const Home = () => {
  return (
    <>
      <Intro />
      <PastOffers />
      <TripPlanner />
      <GuestsLove />
    
      {/* Inspirational Section */}
      <div className="relative w-full mt-10 overflow-hidden">
        <div
          className="w-full h-[300px] sm:h-[350px] md:h-[400px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/backgroundImg.jpg')",
          }}
        >
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative max-w-[1220px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-8 sm:py-10 lg:py-11">
            {/* Top Text */}
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight">
                Get Inspirations For Your Next Trip
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 font-normal sm:font-medium lg:font-semibold max-w-2xl">
                Read About Wonderful Adventure We Love Most
              </p>
            </div>

            {/* Bottom Text */}
            <div className="ml-auto max-w-[90%] sm:max-w-[60%] lg:max-w-[40%] text-right space-y-2">
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight">
                Difficult Roads Lead To Beautiful Destination.
              </h3>
              <button className="text-base sm:text-lg text-white font-normal cursor-pointer transition-transform duration-300 hover:translate-x-1 inline-flex items-center group">
                Read More 
                <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                  {">"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
      <Outlet />
    </>
  );
};

export default Home;