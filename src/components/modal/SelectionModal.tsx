import { ReactNode, useEffect, useRef, useState } from "react";
import CloseIcon from "../../assets/svg/Close";
import Button from "../button/Button";

interface ModalTypes {
  title: string;
  isModalOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}
const SelectionModal = ({
  title,
  isModalOpen = false,
  onClose,
  children,
}: ModalTypes) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);
  const handleClose = () => onClose();

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
      )}

      {isModalOpen && (
        <div
          
          className="fixed inset-0 z-[100] flex items-center  justify-center"
        >
          <div ref={modalRef} className="flex flex-col gap-[14px] w-[25%] rounded-lg h-auto p-4 border border-[#D9D9D9] bg-[#FFF] shadow-[0px_12px_20px_0px_rgba(0,0,0,0.5)]">
            <div className="flex flex-row items-center w-full justify-between pb-2 border-b-1">
              <p className="text-[18px] font-semibold">{title}</p>
              <span onClick={handleClose} className="cursor-pointer">
                <CloseIcon size={24} />
              </span>
            </div>
            <div>{children}</div>

            <div>
              <Button title="Təsdiqlə" onClick={handleClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectionModal;
