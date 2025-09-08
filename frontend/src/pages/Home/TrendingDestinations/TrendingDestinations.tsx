import PageHeader from "../../../components/pageHeader/PageHeader";
import PostCard from "../../../components/post_card/PostCard";
import Pict from "@/assets/images/Photo 1.png";
import Az from "@/assets/flags/flagAz.svg?react";

const TrendingDestinations = () => {
  return (
    <div className="pt-16 px-4 py-6 space-y-4 w-full max-w-[1220px] m-auto">
      <PageHeader
        title="Trending destinations"
        sideText="Most popular choices for travellers from Azerbaijan"
      />
      <div className="grid ns:grid-cols-1 sm:grid-cols-2 items-center gap-4">
        <PostCard image={Pict} city="Baku" Flag={Az} ><span className="text-white">Baku</span> <Az/> </PostCard>
        <PostCard image={Pict} city="Baku" Flag={Az} ><span className="text-white">Baku</span> <Az/> </PostCard>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 items-center gap-4">
        <PostCard image={Pict} city="Baku" Flag={Az} ><span className="text-white">Baku</span> <Az/> </PostCard>
        <PostCard image={Pict} city="Baku" Flag={Az} ><span className="text-white">Baku</span> <Az/> </PostCard>
        <PostCard image={Pict} city="Baku" Flag={Az} ><span className="text-white">Baku</span> <Az/> </PostCard>
      </div>
    </div>
  );
};

export default TrendingDestinations;
