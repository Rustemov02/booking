import BookingBar from "./components/bookingBar/bookingBar";
import CategorySection from "./components/categorySection/categorySection";
import GuestHeader from "./components/header/GuestHeader";
// import bannerImage from './assets/images/banner.png'

function App() {
  return (
    <div className="flex justify-center h-auto w-full flex-col bg-neutral-100">
      <GuestHeader />

      <CategorySection />

      <div
        className="w-full h-[400px] mt-10 relative border-2"
        style={{
          backgroundImage: "url('/backgroundImg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p className="absolute top-1/2 left-[10%] text-[44px] font-bold  text-[#FFF]">
          Discover Your Trip <br/>Worldwide
        </p>
      </div>


          <BookingBar />
  
  
    </div>
  );
}

export default App;
