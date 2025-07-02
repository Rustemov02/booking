import { useEffect } from "react";
import apiRequest from "../../../api/apiRequest";
import Card from "../../../components/card/Card";
import PageHeader from "../../../components/pageHeader/PageHeader";
import getRoutes from "../../../modules";

const DestinationsPage = () => {
  const routes = getRoutes();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await apiRequest({
          method: "GET",
          url: "/api/rooms/all", 
          onError: (err) => console.log(err),

        });
        console.log(response)
      } catch (err) {
        console.log(err);
      }
    };

    fetchRooms();
  }, []);

  const handleRequest = async () => {};
  return (
    <div className="pt-24 px-4 py-6 space-y-4 w-full max-w-[1220px] m-auto">
      <PageHeader title="Explore Stay in Trending Destinations" />
      <div className="text- font-semibold text-[#000]">Find Hot Stays</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] items-center flex-wrap gap-6">
        <Card
          onClick={handleRequest}
          id={1}
          basePath={routes.destinationDetail}
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />
        <Card
          id={2}
          basePath={routes.destinationDetail}
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />
        <Card
          id={2}
          basePath={routes.destinationDetail}
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />
        <Card
          id={2}
          basePath={routes.destinationDetail}
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />
        <Card
          id={2}
          basePath={routes.destinationDetail}
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />
        <Card
          id={2}
          basePath={routes.destinationDetail}
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />
        <Card
          id={2}
          basePath={routes.destinationDetail}
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />
        <Card
          id={2}
          basePath={routes.destinationDetail}
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />
      </div>
    </div>
  );
};

export default DestinationsPage;
