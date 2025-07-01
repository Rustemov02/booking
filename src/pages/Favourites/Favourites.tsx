import Card from "../../components/card/Card";
import PageHeader from "../../components/pageHeader/PageHeader";

const FavouritesPage = () => {
  return (
    <div className="container pt-10 flex flex-col gap-6">
      <PageHeader title="Hotel Favourites" />

      <div className="grid grid-cols-3 gap-6">
        <Card
          // onClick={handleRequest}
          id={1}
          // basePath={routes.destinationDetail}
          position="horizontal"
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />
        <Card
          // onClick={handleRequest}
          id={1}
          // basePath={routes.destinationDetail}
          position="horizontal"
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />
        <Card
          // onClick={handleRequest}
          id={1}
          // basePath={routes.destinationDetail}
          position="horizontal"
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />{" "} <Card
          // onClick={handleRequest}
          id={1}
          // basePath={routes.destinationDetail}
          position="horizontal"
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />{" "} <Card
          // onClick={handleRequest}
          id={1}
          // basePath={routes.destinationDetail}
          position="horizontal"
          title="Berlin"
          text="SIDE"
          rating={3.2}
          date="Wed 25 Jan-Fri 27 Jan"
          desc="A Tour Of The City And Its Surroundings Led By A Professional Guide"
        />{" "}
      </div>
    </div>
  );
};

export default FavouritesPage;
