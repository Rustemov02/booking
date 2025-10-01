import BookingBar from "../../components/bookingBar/bookingBar";

const Intro = () => {
  return (
    <div className="relative w-full flex justify-center items-center">
      <div
        className="w-full min-h-[250px] h-[300px] sm:h-[350px] md:h-[400px] flex items-start justify-center pt-16 sm:pt-20 md:pt-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-homepage.png')",
        }}
      >
        <BookingBar />
      </div>
    </div>
  );
};

export default Intro;