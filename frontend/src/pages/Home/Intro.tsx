import BookingBar from "../../components/bookingBar/bookingBar";

const Intro = () => {
  return (
    <div className="relative flex justify-center items-center">
      <div
        className="w-full h-[300px]  flex items-start justify-center"
        style={{
          backgroundImage: "url('/bg-homepage.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <p className="font-bold text-[#FFF] text-[20px] !mt-6">
          Find your next stay
        </p> */}
        <BookingBar />
      </div>
      {/* <MiniBar /> */}
    </div>
  );
};

export default Intro;
