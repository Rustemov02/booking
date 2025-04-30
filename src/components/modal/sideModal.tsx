import { FC } from "react";

const SideModal: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black opacity-50 flex items-center justify-center z-50`}
        ></div>
      )}

      <div
        className={`transition-all duration-600 fixed top-0 right-0 max-w-[300px] h-full bg-[#ffffff] z-100 ${
          isOpen ? "opacity-100 w-full " : "opacity-0 w-0  "
        }`}
      >
        MODAL{" "}
        <span className="text-[20px]" onClick={() => onClose()}>
          Close
        </span>
      </div>
    </>
  );
};

export default SideModal;
