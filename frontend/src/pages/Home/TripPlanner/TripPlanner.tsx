import { useState } from "react";
import CategorySection from "../../../components/categorySection/categorySection";
import PageHeader from "../../../components/pageHeader/PageHeader";
import sheki from "@/assets/images/sheki.jpg";
const TripPlanner = () => {
  const categoryData = [
    "Adventure and Hiking",
    "Cultural Exploration",
    "Historical tours",
    "Local Festivals",
    "Wellness",
  ];
  const [selectedItem, setSelectedItem] = useState("Adventure and Hiking");

  const TripCard = () => {
    return (
      <div className="flex flex-col gap-2 items-start w-fit ">
        <img src={sheki} alt="img" className="w-[170px] h-[136px] rounded-xl" />
        <div className="flex flex-col items-start">
          <p className="[#1A1A1A] text-[16px] font-bold">Sheki</p>
          <span className="text-[#595959] text-[14px]">3,400 properties</span>
        </div>
      </div>
    );
  };
  return (
    <section className="w-full max-w-[1220px] m-auto px-4 py-6 flex flex-col gap-3">
      <PageHeader
        title="Quick and easy trip planner"
        sideText="Pick a vibe and explore the top destinations in Azerbaijan"
      />

      <div className={`flex items-center w-full justify-evenly`}>
        {categoryData.map((item) => {
          return (
            <div
              onClick={() => setSelectedItem(item)}
              className={` text-[14px] py-[11px] px-4 rounded-3xl border cursor-pointer transition duration-500 ${
                selectedItem === item
                  ? "text-white bg-[#006CE4]"
                  : "text-[#1A1A1A] border"
              }`}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* TRIP CARDS */}
      <div className="mt-4 grid items-center grid-cols-6">
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
      </div>
    </section>
  );
};

export default TripPlanner;
