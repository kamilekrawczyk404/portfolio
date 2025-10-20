"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface ContainerComponent extends React.FC {
  AnimateChangeInHeight: React.FC<AnimateChangeInHeightProps>;
  Default: React.FC<DefaultContainerProps>;
}

const Container: ContainerComponent = (): ReactNode => (
  <div>Default container</div>
);

type AnimateChangeInHeightProps = HTMLMotionProps<"div">;

const AnimateChangeInHeight = ({
  children,
  ...props
}: AnimateChangeInHeightProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0].contentRect.height;
        setHeight(observedHeight);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <motion.div
      className={`${props?.className}, "overflow-hidden"`}
      style={{ height }}
      animate={{ height }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      <motion.div ref={containerRef}>{children}</motion.div>
    </motion.div>
  );
};

type DefaultContainerProps = HTMLMotionProps<"div"> & { dataTestId?: string };

const Default = ({
  children,
  dataTestId,
  className = "",
  ...props
}: DefaultContainerProps) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <motion.div
      data-testid={dataTestId}
      className={`p-4 shadow-lg rounded-lg border-1 ${theme.borderSecondary} ${theme.background} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Container.AnimateChangeInHeight = AnimateChangeInHeight;
Container.Default = Default;

export default Container;
