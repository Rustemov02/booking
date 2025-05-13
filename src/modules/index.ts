const allRoutes = {
  main: "/hotel",
  destinationDetail : (id : string) => `destinations/${id}` ,
  login: "/login",
  register: "/register",
} as const;

const getRoutes = () => {
  return allRoutes;
};

export default getRoutes;
