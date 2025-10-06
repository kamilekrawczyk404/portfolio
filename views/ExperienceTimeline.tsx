"use client";
import React, { useEffect, useMemo, useState } from "react";
import Timeline, { TimelineEvent } from "@/components/timeline/Timeline";

type JobDescription = {
  role: string;
  place: "remote" | "hybrid" | "onsite";
  type: "full-time" | "part-time" | "temporary" | "freelance";
  company: {
    name: string;
    city: string;
  };
  responsibilities: string[];
  learnings: string[];
  achievements: string[];
  technologiesUsed: string[];
};

type ExperienceTimeEvent = TimelineEvent<JobDescription>;

type ExperienceTimeLineProps = {
  locale: string;
};

const jobs: ExperienceTimeEvent[] = [
  {
    start: new Date("2024/09/15"),
    end: "now",
    role: "Junior Frontend Developer",
    type: "freelance",
    place: "remote",
    company: {
      name: "Printworks sp. z o.o.",
      city: "Modlnica, Kraków, PL",
    },
    responsibilities: ["Leading", "Moving", "Reviews", "Scrum"],
    learnings: ["React", "MongoDB", "WebSockets"],
    achievements: [
      "SuccessfulMoving",
      "CodeReadability",
      "Performance",
      "Testing",
    ],
    technologiesUsed: [
      "ReactJS",
      "Redux",
      "MongoDB",
      "MySQL",
      "Docker",
      "jQuery",
      "WebSockets",
      "Bootstrap",
      "SCSS",
      "Webpack",
    ],
  },
];

const formatJobsEndTime = (
  jobs: ExperienceTimeEvent[],
  now: Date,
): ExperienceTimeEvent[] =>
  jobs.map(
    (job) =>
      ({
        ...job,
        end: typeof job.end === "string" ? now : job.end,
      }) as ExperienceTimeEvent,
  );

const ExperienceTimeline = ({ locale }: ExperienceTimeLineProps) => {
  const [time, setTime] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const events = useMemo<ExperienceTimeEvent[]>(() => {
    if (!time) return [];
    return formatJobsEndTime(jobs, time);
  }, [time]);

  useEffect(() => {
    // Function to update the time state
    const updateTime = () => {
      const now = new Date();
      setTime(now);

      // Set endDate ONCE (6 months from now) if it hasn't been set yet
      setEndDate((prev) => {
        if (prev) return prev;
        const initialEnd = new Date(now); // Create a fresh copy for manipulation
        return new Date(initialEnd.setMonth(initialEnd.getMonth() + 2));
      });
    };

    // Run immediately on mount for the first render sync
    updateTime();

    // FIX: Set interval to call updateTime, ensuring 'new Date()' is called
    // inside the interval to avoid using a stale closure value.
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []); // Only runs once on mount

  const startDate = new Date("01-01-2024");

  if (!endDate || !time) return <></>;

  return (
    <Timeline
      time={time}
      timelineStart={startDate}
      timelineEnd={endDate}
      locale={locale}
      events={events}
      totalWidth={400}
      renderEvent={(item) => <div>{item.type}</div>}
    />
  );
};

export default ExperienceTimeline;
