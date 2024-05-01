import { useEffect } from "react";

const useClickAway = ({elementRef,arrayOfElementRef = [], onClickAway}) => {

  const clickAwayHandler = (e) => {
    if (arrayOfElementRef.length) {
      for (let i = 0; i < arrayOfElementRef.length; i++) {
        const isEventInsideElement =arrayOfElementRef[i].current?.contains(e.target);
        if (isEventInsideElement) return;
      }
    }
    if(elementRef){
        if (elementRef.current?.contains(e.target)) return;
    }

    onClickAway(e);
  };

  useEffect(() => {
    document.addEventListener("click", clickAwayHandler);
    return () => {
      document.removeEventListener("click", clickAwayHandler);
    };
  }, [elementRef,arrayOfElementRef, onClickAway]);
};

export default useClickAway;
