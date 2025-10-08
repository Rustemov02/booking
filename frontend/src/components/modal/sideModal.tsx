import { FC, useEffect } from "react";

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideModal: FC<SideModalProps> = ({ isOpen, onClose, children }) => {
  // Body scroll-u bloklamaq
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40"
        />
      )}

      {/* Modal content */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default SideModal;
