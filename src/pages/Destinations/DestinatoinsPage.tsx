import Card from "../../components/card/Card";
import PageHeader from "../../components/pageHeader/PageHeader";

const DestinationsPage = () => {
  return (
    <div className="pt-24 px-4 py-6 space-y-4 w-full max-w-[1220px] m-auto">
      <PageHeader title="Explore Stay in Trending Destinations" /> 
      <div className="text-[16px] font-semibold text-[#000]">Find Hot Stays</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] items-center flex-wrap gap-6">
      <Card 
        title="Berlin"
        text="SIDE"
        rating={3.2}
        date='Wed 25 Jan-Fri 27 Jan'
        desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
      /> 
      </div>
    
    </div>
  );
};

export default DestinationsPage;
