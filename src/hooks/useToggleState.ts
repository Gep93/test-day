import { useState } from "react";

function useToggle(
  initialVal = false
): [boolean, (override?: boolean) => void] {
  const [state, setState] = useState(initialVal);

  const toggle = (override?: boolean) => {
    override === undefined ? setState(!state) : setState(override);
    // setState(!state);
  };
  return [state, toggle];
}

export default useToggle;
