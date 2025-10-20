"use client";
import React, {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DateTimeFormatOptions } from "use-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValue,
  HTMLMotionProps,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { Color, hexToRgba, layoutProperties } from "@/layout";
import {
  animationProperties,
  animationsTypes,
  variantsPresets,
} from "@/animations";
import useAttachedObjectToCursor from "@/hooks/useAttachedObjectToCursor";
import { Icons } from "@/components/Icons";

export type TimelineEvent<T extends object> = {
  start: Date;
  end: Date | string;
  color: Color;
} & T;

type TimelineProps<T extends object> = {
  timelineStart: Date;
  timelineEnd: Date;
  locale: string;
  totalWidth?: number;
  mainIndicatorFrequency?: number;
  events: TimelineEvent<T>[];
  renderEvent: (
    timelineEvent: TimelineEvent<T>,
    isActive: boolean,
  ) => ReactNode;
};

const Timeline = <T extends object>({
  locale,
  timelineStart,
  timelineEnd,
  events,
  renderEvent,
  totalWidth = 400,
  mainIndicatorFrequency = 6,
}: TimelineProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 25%"],
  });

  const years = Math.max(
    timelineEnd.getFullYear() - timelineStart.getFullYear(),
    1,
  );
  const months = timelineEnd.getMonth() - timelineStart.getMonth() + 12 * years;

  const yearWidth = totalWidth / years;
  const monthWidth = yearWidth / 12;

  const motionWidth = useMotionValue(`${totalWidth}vw`);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${Math.max(years * yearWidth, totalWidth)}vw`],
  );

  return (
    <motion.div
      ref={containerRef}
      className={`relative`}
      style={{ height: `${totalWidth}vh` }}
    >
      <motion.div
        ref={targetRef}
        style={{ x, width: motionWidth }}
        className={`sticky top-[calc(100%-5rem)] flex`}
      >
        {Array.from({ length: months }, (_, index) => {
          const copyDate = new Date(timelineStart);
          copyDate.setMonth(copyDate.getMonth() + index);

          return copyDate;
        }).map((date, index) => (
          <MonthIndicator
            key={index}
            isMain={index % mainIndicatorFrequency === 0}
            withGradient={index === months - 1}
            monthWidth={monthWidth}
            date={date}
            locale={locale}
          />
        ))}

        {events.map((event, index) => (
          <Event
            key={index}
            timelineStart={timelineStart}
            timelineEnd={timelineEnd}
            totalWidth={totalWidth}
            locale={locale}
            event={event}
            renderEvent={renderEvent}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const getFormattedDate = ({
  date,
  options,
  locale,
}: {
  date: Date;
  options: DateTimeFormatOptions;
  locale: string;
}): string => {
  try {
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  } catch (error) {
    console.error("Error during date formatting:", error);
    return "Invalid Date";
  }
};

type MonthIndicatorProps = {
  date: Date;
  locale: string;
  monthWidth: number;
  className?: string;
  isMain?: boolean;
  withGradient?: boolean;
};
const MonthIndicator = ({
  date,
  locale,
  monthWidth,
  className = "",
  isMain = false,
  withGradient = false,
}: MonthIndicatorProps): ReactNode => {
  const { theme, opposite } = useSelector((state: RootState) => state.theme);

  const mainDateOptions: DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  const onlyMonths: DateTimeFormatOptions = {
    month: "short",
  };

  return (
    <div
      className={`sticky top-2/3 flex ${layoutProperties.text.extraSmall} ${theme.foreground} ${className}`}
      style={{ width: `${monthWidth}vw` }}
    >
      {withGradient && (
        <div
          className={`absolute inset-0 z-10 bg-gradient-to-r from-transparent to-neutral-950`}
        />
      )}

      <div className={`absolute inset-0 border-t-1 ${theme.borderSecondary}`} />

      <div
        style={{ height: isMain ? "2rem" : "1rem" }}
        className={`absolute text-nowrap translate-y-full -translate-x-1/2`}
      >
        <div
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-full h-full ${
            isMain
              ? `${opposite.background} w-[1px]`
              : `${theme.borderSecondary} border-r-1`
          }`}
        />
        {getFormattedDate({
          date,
          options: isMain ? mainDateOptions : onlyMonths,
          locale,
        })}
      </div>
    </div>
  );
};

type EventProps<T extends object> = Pick<
  TimelineProps<T>,
  "timelineEnd" | "timelineStart" | "totalWidth" | "locale" | "renderEvent"
> & {
  children?: ReactNode;
  event: TimelineEvent<T>;
};

const Event = <T extends object>({
  totalWidth,
  timelineStart,
  timelineEnd,
  locale,
  event,
  renderEvent,
}: EventProps<T>) => {
  const { end, start, color } = event;

  const effectiveEnd = end instanceof Date ? end : timelineEnd;
  const totalDifferenceMs = timelineEnd.getTime() - timelineStart.getTime();
  const startOffsetMs = start.getTime() - timelineStart.getTime();
  const eventDurationMs = effectiveEnd.getTime() - start.getTime();

  if (totalDifferenceMs <= 0 || startOffsetMs < 0 || eventDurationMs < 0) {
    console.warn("Invalid event duration or timeline span.");
    return null;
  }

  const leftPositionVW = (startOffsetMs / totalDifferenceMs) * totalWidth;

  const widthVW = (eventDurationMs / totalDifferenceMs) * totalWidth;

  const barsColor = color.startsWith("#") ? hexToRgba(color, 0.3) : color;

  const containerRef = useRef<null | HTMLDivElement>(null);
  const eventContainer = useRef<null | HTMLDivElement>(null);

  const isEventInView = useInView(containerRef);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const { isVisible, leftOffset } = useAttachedObjectToCursor({
    parent: containerRef,
    target: eventContainer,
  });

  useEffect(() => {
    const handleClickOutsideTimelineEvent = (e: React.MouseEvent) => {
      if (
        isActive &&
        eventContainer &&
        !eventContainer.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
    };

    // @ts-ignore
    document.addEventListener("click", handleClickOutsideTimelineEvent);
    return () =>
      // @ts-ignore
      document.removeEventListener("click", handleClickOutsideTimelineEvent);
  }, [eventContainer, isActive]);

  // deactivate expanded container when user scroll to the other section
  useEffect(() => {
    if (!isEventInView && isActive) {
      setIsActive(false);
    }
  }, [isEventInView]);

  return (
    <motion.div
      ref={containerRef}
      className={`border-1 border-b-0 rounded-t-md absolute bottom-0 cursor-pointer h-8`}
      style={{
        borderColor: color,
        left: `${leftPositionVW}vw`,
        width: `${widthVW}vw`,
        minWidth: "5vw", // Ensure event is visible even if duration is short
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => setIsActive(true)}
      animate={
        isHover || isActive
          ? {
              boxShadow: `0 -1px 15px ${color}`,
            }
          : {}
      }
      transition={{
        duration: animationProperties.durations.medium,
      }}
    >
      {/*bars*/}
      <motion.div
        className={"absolute inset-0 rounded-t-md"}
        style={{
          backgroundSize: "2rem 2rem",
          backgroundImage: `linear-gradient(
            -45deg,
            ${barsColor} 25%,
            transparent 25%,
            transparent 50%,
            ${barsColor} 50%,
            ${barsColor} 75%,
            transparent 75%,
            transparent
          )`,
        }}
        initial={{
          backgroundPosition: "0rem",
        }}
        animate={{
          backgroundPosition: "2rem",
        }}
        transition={{
          repeatType: "loop",
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <AnimatePresence>
        {(isVisible || isActive) && (
          <AttachedEventContainer
            ref={eventContainer}
            style={{ left: leftOffset }}
            className={"absolute bottom-[calc(100%+1rem)] -translate-x-1/2"}
          >
            {renderEvent(event, isActive)}
          </AttachedEventContainer>
        )}
      </AnimatePresence>
      <EventPoint color={color} position={"start"} />
      <EventPoint color={color} position={"end"} />
    </motion.div>
  );
};

const AttachedEventContainer = ({
  ref,
  children,
  ...props
}: HTMLMotionProps<"div">) => {
  const variants = variantsPresets.appearing({
    duration: animationProperties.durations.medium,
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      transition={{
        ...animationsTypes.default,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const EventPoint = ({
  className,
  color,
  position = "start",
}: HTMLMotionProps<"div"> & {
  color: string;
  position: "start" | "end";
}) => {
  return (
    <div
      className={`absolute top-full -translate-y-1/2 z-10 ${
        position === "start" ? "left-0" : "right-0"
      } ${className}`}
    >
      <motion.div
        animate={{
          boxShadow: [
            `0 0 5px ${color}`,
            `0 0 10px ${color}`,
            `0 0 5px ${color}`,
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          repeatType: "loop",
        }}
        style={{ backgroundColor: color }}
        className={`w-2 aspect-square rounded-lg ${
          position === "start" ? "-translate-x-1/2" : "translate-x-1/2"
        }`}
      />
    </div>
  );
};

export default Timeline;
