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
      <div className="flex flex-col gap-2 items-start group cursor-pointer">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={sheki}
            alt="destination"
            className="w-full aspect-[5/4] object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-gray-900 text-base font-bold">Sheki</p>
          <span className="text-gray-600 text-sm">3,400 properties</span>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 flex flex-col gap-6">
      <PageHeader
        title="Quick and easy trip planner"
        sideText="Pick a vibe and explore the top destinations in Azerbaijan"
      />

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
        {categoryData.map((item) => {
          return (
            <button
              key={item}
              onClick={() => setSelectedItem(item)}
              className={`text-sm py-2.5 px-4 sm:px-5 rounded-full border transition-all duration-300 whitespace-nowrap ${
                selectedItem === item
                  ? "text-white bg-blue-600 border-blue-600 shadow-md"
                  : "text-gray-900 border-gray-300 hover:border-gray-400 hover:shadow-sm"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Trip Cards Grid */}
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
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
