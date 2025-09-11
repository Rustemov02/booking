import { FC, ReactNode, useEffect, useRef } from "react";
import CloseIcon from "../../assets/svg/Close";

const InfoModal: FC<{
  isModalOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}> = ({ isModalOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // document.body.style.overflow = isModalOpen ? "hidden" : "auto";

    if (isModalOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = prevPaddingRight;
    }

    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;

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
  }, [isModalOpen, onClose]);

  const handleClose = () => onClose();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50
        ${
          isModalOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300
        ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`flex flex-col gap-[14px] w-11/12 lg:w-[45%] rounded-3xl p-4 border border-[#D9D9D9] bg-white shadow-[0px_12px_20px_0px_rgba(0,0,0,0.5)]
          transform transition-all duration-300
          ${
            isModalOpen ? "translate-y-0 scale-100" : "translate-y-6 scale-95"
          }`}
        >
          <div onClick={handleClose} className="cursor-pointer ">
            <CloseIcon size={30} />
          </div>
          <div className="text-[26px] text-[#222222] font-semibold">
            {title}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default InfoModal;
