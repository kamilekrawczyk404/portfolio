"use client";
import React, { CSSProperties, ReactNode, useRef } from "react";
import { DateTimeFormatOptions } from "use-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  useMotionValue,
} from "framer-motion";
import { layoutProperties } from "@/layout";

export type TimelineEvent<T extends object> = {
  start: Date;
  end: Date | string;
} & T;

type TimelineProps<T extends object> = {
  time: Date;
  timelineStart: Date;
  timelineEnd: Date;
  locale: string;
  totalWidth?: number;
  mainIndicatorFrequency?: number;
  events: TimelineEvent<T>[];
  renderEvent: (timelineEvent: TimelineEvent<T>) => ReactNode;
};

const Timeline = <T extends object>({
  locale,
  time,
  timelineStart,
  timelineEnd,
  events,
  renderEvent,
  totalWidth = 400,
  mainIndicatorFrequency = 6,
}: TimelineProps<T>) => {
  const { theme } = useSelector((state: RootState) => state.theme);

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

  console.log(months);

  const yearWidth = totalWidth / years;
  const monthWidth = yearWidth / 12;

  const difference = timelineEnd.getTime() - timelineStart.getTime();

  // const width = Math.max(years * yearWidth, yearWidth);
  const motionWidth = useMotionValue(`${totalWidth}vw`);

  // indicatorFrequency represents number of months

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${Math.max(years * yearWidth, totalWidth)}vw`],
  );

  useMotionValueEvent(scrollYProgress, "change", (l) =>
    console.log("latest", l),
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
        className={`sticky top-2/3 flex`}
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
            start={event.start}
            end={event.end}
            timelineStart={timelineStart}
            timelineEnd={timelineEnd}
            totalWidth={totalWidth}
          >
            {renderEvent(event)}
          </Event>
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

const TimelineEvent = ({}) => {
  return <div>Event</div>;
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
      className={`sticky top-2/3 flex  ${layoutProperties.text.extraSmall} ${theme.foreground} ${className}`}
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

const Event = <T extends object>({
  totalWidth,
  timelineStart,
  timelineEnd,
  start,
  end,

  children,
}: Pick<TimelineEvent<T>, "start" | "end"> &
  Pick<TimelineProps<T>, "timelineEnd" | "timelineStart" | "totalWidth"> & {
    children?: ReactNode;
  }) => {
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

  return (
    <div
      className={
        "absolute top-1/2 -translate-y-1/2 h-8 py-1 px-3 bg-red-500/25 border-l-4 border-red-500 rounded-md transition-all duration-300 shadow-lg cursor-pointer hover:bg-red-500/40"
      }
      style={{
        left: `${leftPositionVW}vw`,
        width: `${widthVW}vw`,
        minWidth: "5vw", // Ensure event is visible even if duration is short
      }}
    >
      <div className="text-xs text-red-100 overflow-hidden whitespace-nowrap">
        {children}
      </div>
    </div>
  );
};

export default Timeline;
