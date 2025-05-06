import BookingBar from "../../components/bookingBar/bookingBar";

const Intro = () => {
  return (
    <div className="relative flex justify-center items-center">
      <div
        className="w-full h-[400px] mt-10 relative"
        style={{
          backgroundImage: "url('/backgroundImg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p className="absolute top-1/2 left-[10%] text-[44px] font-bold  text-[#FFF]">
          Discover Your Trip <br />
          Worldwide
        </p>
      </div>
      <span className="fixed opacity-100 right-10 lg:opacity-0 lg:right-0  top-70 transition-all duration-300 bg-amber-500 rounded-full w-16 h-16"></span>

      <BookingBar extraStyle="absolute  top-105  mx-auto bg-white" />
    </div>
  );
};

export default Intro;
