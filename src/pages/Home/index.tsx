import CategorySection from "../../components/categorySection/categorySection";
import GuestHeader from "../../components/header/GuestHeader";
import Intro from "../../pages/Home/Intro";
import DestinationsPage from "../Destinations/DestinatoinsPage";

const Home = () => {
  return (
    <>
      <GuestHeader />
      <CategorySection />
      <Intro />
      {/* <DestinationsPage/> */}
    </>
  );
};

export default Home;
