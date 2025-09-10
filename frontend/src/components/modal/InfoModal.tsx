import { FC, ReactNode, useEffect, useRef } from "react";
import CloseIcon from "../../assets/svg/Close";

const InfoModal: FC<{
  isModalOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}> = ({ isModalOpen, onClose, children }) => {
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
      {true && <div className="fixed inset-0 bg-black opacity-50 z-50"></div>}
      {true && (
        <div className="fixed inset-0 z-[100] flex items-center  justify-center">
          <div
            ref={modalRef}
            className="flex flex-col gap-[14px] w-[45%] rounded-3xl h-auto p-4 border border-[#D9D9D9] bg-[#FFF] shadow-[0px_12px_20px_0px_rgba(0,0,0,0.5)]"
          >
            <div>
              <CloseIcon size={30}/>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoModal;
