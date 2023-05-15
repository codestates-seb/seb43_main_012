import { useEffect } from "react";

export default function useCheck(
  checkFunction: any,
  checkedArg: any,
  setIsState: any
) {
  useEffect(() => {
    setIsState(checkFunction(checkedArg));
  }, [checkFunction, checkedArg, setIsState]);
}
