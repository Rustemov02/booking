import CategorySection from "../../components/categorySection/categorySection";
import GuestHeader from "../../components/header/GuestHeader";
import Intro from "../../pages/Home/Intro";
import DestinationsPage from "./Destinations/DestinatoinsPage";
import PastOffers from "./PastOffers/PastOffers";

import { supabase } from "../../lib/supabaseClient";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("booking_rooms_list")
        .select("*");
        
      if (error) {
        console.log("Error fetching data: ", error.message);
      } else {
        console.log("Fetched data: ", data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <GuestHeader />

      {/* <CategorySection />
      <Intro />
      <DestinationsPage />
      <PastOffers /> */}

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
        <p className="text-[16px] text-white font-semibold absolute top-11 left-13">
          Get Inspirations For Your Next Trip <br />
          <span>Read About Wonderful Adventure We Love Most</span>
        </p>
        <p className="text-[16px] lg:text-[28px] text-white font-bold w-[40%] text-end absolute bottom-11 right-13">
          Difficult Roads Lead To Beautiful Destination.
          <br />
          <span>Read More {">"}</span>
        </p>
      </div> */}
    </>
  );
};

export default Home;
