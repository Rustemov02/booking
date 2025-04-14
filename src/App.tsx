import CategorySection from "./components/categorySection/categorySection";
import GuestHeader from "./components/header/GuestHeader";

function App() {
  return (
    <div className="flex justify-center h-auto w-full px-4 flex-col">
      <GuestHeader />
      
      <CategorySection/>
    </div>
  );
}

export default App;
