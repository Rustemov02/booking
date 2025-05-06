import CategorySection from "../../components/categorySection/categorySection";
import GuestHeader from "../../components/header/GuestHeader";
import Intro from "../../pages/Home/Intro";
import DestinationsPage from "../Destinations/DestinatoinsPage";
import PastOffers from "../PastOffers/PastOffers";

const Home = () => {
  return (
    <>
      <GuestHeader />
      <CategorySection />
      <Intro />
      <DestinationsPage/>
      <PastOffers/>
    </>
  );
};

export default Home;
