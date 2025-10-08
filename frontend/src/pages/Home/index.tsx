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
      {/* ... */}

      {/* <Footer /> */}
      <Outlet />
    </>
  );
};

export default Home;
