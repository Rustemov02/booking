import React, { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import Modal from "../../components/modal/sideModal";
const HotelHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="8" width="3" height="9" fill="white" rx="0.5" />
                <rect x="8" y="8" width="3" height="9" fill="white" rx="0.5" />
                <rect x="13" y="8" width="3" height="9" fill="white" rx="0.5" />
                <path
                  d="M2 8L10 3L18 8"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-gray-900">
              Hotels.com
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Language selector */}
            <button className="flex items-center cursor-pointer gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Globe size={18} className="text-gray-600" />
              <span className="text-sm font-medium">English</span>
            </button>

            {/* Sign in button */}
            <button className="px-4 lg:px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              Sign in
            </button>

            {/* Register button */}
            <button className="px-4 lg:px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-13 z-20 bg-white right-0 w-full md:hidden mt-4 pt-4 border-t border-gray-200 animate-slideDown">
            <style>{`
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-slideDown {
                animation: slideDown 0.2s ease-out;
              }
            `}</style>

            <nav className="flex flex-col gap-2">
              {/* Language selector */}
              <button className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors w-full text-left">
                <Globe size={18} className="text-gray-600" />
                <span className="text-sm font-medium">English</span>
              </button>

              {/* Sign in button */}
              <button className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors w-full text-left">
                Sign in
              </button>

              {/* Register button */}
              <button className="px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors w-full">
                Register
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default HotelHeader;
