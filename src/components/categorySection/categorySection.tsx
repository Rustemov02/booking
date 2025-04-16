import { useState } from "react";
import SectionCard from "./SectionCard";
import styles from './section.module.css'

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
    <div className={styles.card_container}>
      {categoryData.map((item) => {
        return <SectionCard title={item} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>;
      })}
    </div>
  );
};

export default CategorySection;
