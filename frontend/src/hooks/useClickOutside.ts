import { useEffect, useRef } from "react";

function useClickOutSide(handler: () => void) {
  const ref = useRef(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      // @ts-ignore
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      handler();
    };

    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener);
  }, [handler]);

  return ref;
}

export default useClickOutSide;
