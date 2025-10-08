import BookingBar from "../../components/bookingBar/bookingBar";

const Intro = () => {
  return (
    <div className="relative w-full flex justify-center items-center">
      {/* Hero Section */}
      <div
        className="w-full min-h-[280px] h-[320px] sm:h-[380px] md:h-[440px] flex items-start justify-center pt-20 sm:pt-24 md:pt-28 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-homepage.png')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/60 to-sky-600/60 pointer-events-none" />
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 pointer-events-none" />

        {/* Booking Bar with Glassmorphism */}
        <div className="relative w-full max-w-4xl p-4 sm:p-6 md:p-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
          <BookingBar />
        </div>
      </div>
    </div>
  );
};

export default Intro;
