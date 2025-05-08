import { useEffect, useState } from "react";

const useMediaQuery = (query: number) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const matchQueryList = window.matchMedia(`(min-width: ${query}px)`);
     
    setMatches(matchQueryList.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
 
    matchQueryList.addEventListener("change", handleChange);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
