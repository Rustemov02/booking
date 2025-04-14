import { useState } from "react";
import SectionCard from "./SectionCard";

const CategorySection = () => {
  const categoryData = [
    "Trip",
    "Deals",
    "Hotel",
    "Flight",
    "Apartment",
    "Camper",
  ];
  const [selectedItem , setSelectedItem] = useState("Hotel")
 
  
  return (
    <div className="flex flex-row justify-center gap-4">
      {categoryData.map((item) => {
        return <SectionCard title={item} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>;
      })}
    </div>
  );
};

export default CategorySection;
