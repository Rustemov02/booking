import Card from "../../../components/card/Card";
import PageHeader from "../../../components/pageHeader/PageHeader";

const PastOffers = () => {
  return (
    <div className="pt-16 px-4 py-6 space-y-4 w-full max-w-[1220px] m-auto">
      <PageHeader title="Compare The Highest Reviewed Past Offers" />
      <div className="text-[14px] font-normal text-[#000]">Browse By Type</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] items-center flex-wrap gap-6">
        <Card title="Flight" />
      </div>
    </div>
  );
};

export default PastOffers;
