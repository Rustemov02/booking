import { FC } from "react";

const SideModal: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
 
  return (
    <>
      {isOpen && (
        <div
          onClick={()=>onClose()}
          className={`fixed inset-0 bg-black opacity-50 flex items-center justify-center z-50`}
        ></div>
      )}

      <div
        className={`transition-all duration-300 ease-linear fixed top-0 right-0  max-w-[300px] h-full bg-[lightblue] z-100 ${
          isOpen ? "opacity-100 w-full " : "opacity-0 w-0 "
        }`}
      >
        <span
          className={`cursor-pointer text-[20px]`}
          onClick={() => onClose()}
        >
          Close
        </span>
      </div>
    </>
  );
};

export default SideModal;
