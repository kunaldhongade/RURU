import { useEffect, useState } from "react";

const useToggleModes = ():[boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [mode, setMode] = useState<boolean>(true); // 1 means Light 0 means Dark

  useEffect(() => {
    if (mode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [mode]);

  return [mode,setMode]
};
export default useToggleModes;
