import { FC } from "react";
import styles from './section.module.css'

const SectionCard: FC<{
  title: string;
  selectedItem: string;
  setSelectedItem: (title: string) => void;
}> = ({ title, selectedItem, setSelectedItem }) => {
  return (
    <div
      onClick={() => setSelectedItem(title)}
      className={`${
        selectedItem === title ? styles.active : ""
      } rounded-[30px] py-2 px-4 border w-fit min-w-[120px] text-center text-16 font-medium text-neutral-400 cursor-pointer bg-white  border-neutral-400`}
    >
      {title}
    </div>
  );
};
export default SectionCard;
