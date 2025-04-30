import Card from "../../components/card/Card";
import PageHeader from "../../components/pageHeader/PageHeader";

const DestinationsPage = () => {
  return (
    <div className="py-16">
      <PageHeader title="Explore Stay in Trending Destinations" /> 
      <p className="text-[16px] font-semibold text-[#000]">Find Hot Stays</p>
      <div className="flex flex-row items-center flex-wrap gap-4">
      <Card />
      <Card />
      </div>
    
    </div>
  );
};

export default DestinationsPage;
