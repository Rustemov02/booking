import { useState } from "react";

function useToggle(status: boolean): [boolean, () => void] {
  const [currentStatus, setCurrentStatus] = useState(status);

  const toggle = () => setCurrentStatus((prev) => !prev);
  return [currentStatus, toggle];
}

export default useToggle;
