import { useState } from "react";
import ArrowDown from "../../assets/svg/arrow-down.svg?react";
import SelectionModal from "../modal/SelectionModal";

interface MarkFilterTypes {
  title: string;
  options: string[];
  selectedFilterItems: (items: string[]) => void;
  isCheckbox?: boolean;
}
const MarkFilter = ({
  title,
  options,
  selectedFilterItems,
  isCheckbox = true,
}: MarkFilterTypes) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const displayOptions = [
    ...selectedItems,
    ...options.filter((option) => !selectedItems.includes(option)),
  ];

  const filteredOptions =
    options.length > 5 ? displayOptions.slice(0, 5) : displayOptions;

  const [openHandleModal, setOpenHandleModal] = useState(false);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    if (e.target.checked) {
      if (isCheckbox) {
        setSelectedItems((prev) => [...prev, item]);
      } else {
        setSelectedItems([item]);
      }
    } else {
      setSelectedItems((prev) => prev.filter((i) => i !== item));
    }
    selectedFilterItems(selectedItems);
  };

  const handleMoreModal = () => {
    setOpenHandleModal(true);
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-[16px] font-bold text-[#000] ">{title}</p>
      <div>
        {filteredOptions.map((item) => (
          <div className="flex flex-row items-center gap-[8px]">
            {/* FIXME: customize checkbox component  */}
            <input
              type={`${isCheckbox ? "checkbox" : "radio"}`}
              checked={selectedItems.some((i) => i === item)}
              className="cursor-pointer"
              onChange={(e) => handleCheckboxChange(e, item)}
            />
            <p>{item}</p>
          </div>
        ))}

        {options.length > 5 && (
          <div
            className="flex flex-row items-center gap-[4px] cursor-pointer"
            onClick={handleMoreModal}
          >
            <p className="text-[#07689F] text-[10px]">Show More</p>
            <ArrowDown width={9} height={9} className="stroke-[1.5]" />
          </div>
        )}
      </div>

      <SelectionModal
        isModalOpen={openHandleModal}
        title={title}
        onClose={() => setOpenHandleModal(false)}
      >
        {options.map((item) => (
          <div className="flex flex-row items-center gap-4">
            <input
              type={`${isCheckbox ? "checkbox" : "radio"}`}
              checked={selectedItems.some((i) => i === item)}
              className="cursor-pointer"
              onChange={(e) => handleCheckboxChange(e, item)}
            />
            <p className="text-[18px]">{item}</p>
          </div>
        ))}
      </SelectionModal>
    </div>
  );
};

export default MarkFilter;
