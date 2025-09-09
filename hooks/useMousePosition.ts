"use client";
import { useEffect, useState } from "react";

type Cords = {
  x: number;
  y: number;
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<Cords>({ x: 0, y: 0 });

  useEffect(() => {
    const listener = (event: MouseEventInit): void => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", listener);

    return () => window.removeEventListener("mousemove", listener);
  }, []);

  return mousePosition;
};

export default useMousePosition;
