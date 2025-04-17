import CategorySection from "./components/categorySection/categorySection";
import GuestHeader from "./components/header/GuestHeader";
// import bannerImage from './assets/images/banner.png'

function App() {
  return (
    <div className="flex justify-center h-auto w-full px-4 flex-col bg-neutral-100">
      <GuestHeader />

      <CategorySection />

      <div
        style={{
          backgroundImage: "url('/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat : "no-repeat",
          width: "100%",
          height: "500px",
        }}
      >
      </div>
    </div>
  );
}

export default App;
