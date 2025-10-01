import PageHeader from "../../../components/pageHeader/PageHeader";
import PostCard from "../../../components/post_card/PostCard";
import Pict from "@/assets/images/Photo 1.png";
import Az from "@/assets/flags/flagAz.svg?react";

const TrendingDestinations = () => {
  return (
    <div className="pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8 py-6 space-y-6 w-full max-w-[1220px] mx-auto">
      <PageHeader
        title="Trending destinations"
        sideText="Most popular choices for travellers from Azerbaijan"
      />

      {/* Grid for 2 large cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        <PostCard image={Pict} city="Baku" Flag={Az}>
          <span className="text-white">Baku</span> <Az />
        </PostCard>
        <PostCard image={Pict} city="Baku" Flag={Az}>
          <span className="text-white">Baku</span> <Az />
        </PostCard>
      </div>

      {/* Grid for 3 medium cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <PostCard image={Pict} city="Baku" Flag={Az}>
          <span className="text-white">Baku</span> <Az />
        </PostCard>
        <PostCard image={Pict} city="Baku" Flag={Az}>
          <span className="text-white">Baku</span> <Az />
        </PostCard>
        <PostCard image={Pict} city="Baku" Flag={Az}>
          <span className="text-white">Baku</span> <Az />
        </PostCard>
      </div>
    </div>
  );
};

export default TrendingDestinations;
