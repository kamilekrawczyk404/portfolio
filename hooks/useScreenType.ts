import { useEffect, useState } from "react";

type ScreenTypes = "mobile" | "tablet" | "desktop";

const screenSizes: { [T in ScreenTypes]: number } = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

const useScreenType = () => {
  const [currentScreenType, setCurrentScreenType] = useState<ScreenTypes>(
    () => {
      const width = window.innerWidth;
      if (width <= screenSizes.mobile) return "mobile";
      if (width <= screenSizes.tablet) return "tablet";
      return "desktop";
    },
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= screenSizes.mobile) setCurrentScreenType("mobile");
      else if (width <= screenSizes.tablet) setCurrentScreenType("tablet");
      else setCurrentScreenType("desktop");
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return currentScreenType;
};

export default useScreenType;
