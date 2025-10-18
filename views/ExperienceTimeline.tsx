"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Timeline, { TimelineEvent } from "@/components/timeline/Timeline";
import { colors, layoutProperties } from "@/layout";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@/components/Icons";
import Container from "@/components/containers/Container";
import { animationProperties, variantsPresets } from "@/animations";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Aspect from "@/components/lists/Aspect";
import { useTranslations } from "next-intl";
import ExpandingList from "@/components/lists/ExpandingList";
import TextWithCode from "@/components/text/TextWithCode";

type JobFeatures = {
  responsibilities: string[];
  learnings: string[];
  achievements: string[];
};

type JobDescription = {
  id: number;
  role: string;
  place: "remote" | "hybrid" | "onsite";
  type: "full-time" | "part-time" | "temporary" | "freelance";
  company: {
    name: string;
    city: string;
  };
  features: JobFeatures;
  technologiesUsed: string[];
};

type ExperienceTimeEvent = TimelineEvent<JobDescription>;

type ExperienceTimeLineProps = {
  locale: string;
};

const jobs: ExperienceTimeEvent[] = [
  {
    id: 1,
    color: colors.languages.TypeScript,
    // dates!!
    start: new Date("2024/09/15"),
    end: "now",
    role: "Junior Frontend Developer",
    type: "freelance",
    place: "remote",
    company: {
      name: "Printworks sp. z o.o.",
      city: "Modlnica, Kraków, PL",
    },
    features: {
      responsibilities: ["Leading", "Moving", "Reviews", "Scrum"],
      learnings: ["React", "MongoDB", "WebSockets"],
      achievements: [
        "SuccessfulMoving",
        "CodeReadability",
        "Performance",
        "Testing",
      ],
    },
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

      setEndDate((prev) => {
        if (prev) return prev;
        const initialEnd = new Date(now);
        return new Date(initialEnd.setMonth(initialEnd.getMonth() + 2));
      });
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []); // Only runs once on mount

  const startDate = new Date("01-01-2024");

  const renderJobEvent = useCallback(
    (event: TimelineEvent<JobDescription>, isActive: boolean) => (
      <Job job={event} isActive={isActive} locale={locale} time={time} />
    ),
    [],
  );

  if (!endDate || !time) return <></>;

  return (
    <Timeline
      timelineStart={startDate}
      timelineEnd={endDate}
      locale={locale}
      events={events}
      totalWidth={400}
      renderEvent={(event, isActive) => renderJobEvent(event, isActive)}
    />
  );
};

const Job = ({
  job,
  isActive,
  locale,
  time,
}: {
  job: TimelineEvent<JobDescription>;
  isActive: boolean;
  time: Date;
  locale: string;
}) => {
  const t = useTranslations("HomePage.Experience");

  const { theme } = useSelector((state: RootState) => state.theme);
  const variants = variantsPresets.appearing({
    duration: animationProperties.durations.medium,
  });

  const [listsExpandStatuses, setListsExpandStatuses] = useState<{
    [key in keyof JobFeatures]: boolean;
  }>(
    Object.fromEntries(
      Object.keys(job.features).map((feat, index) => [[feat], index === 0]),
    ),
  );

  const formatDate = useCallback(
    (date: Date): string => {
      const shortFormat = Intl.DateTimeFormat(locale, {
        month: "2-digit",
        year: "2-digit",
        day: "2-digit",
      });
      if (shortFormat.format(time) === shortFormat.format(date))
        return "Present";

      return Intl.DateTimeFormat(locale, {
        month: "short",
        year: "numeric",
      }).format(date);
    },
    [locale],
  );

  return (
    <Container.AnimateChangeInHeight>
      <motion.div
        variants={variants}
        initial={"initial"}
        animate={"animate"}
        exit={"exit"}
        className={`flex flex-col gap-4 lg:p-4 p-2 md:w-xl rounded-md ${theme.background}`}
      >
        <div className={"space-y-2"}>
          <div>
            <h3
              className={`font-[500] space-x-2 ${layoutProperties.text.medium}`}
            >
              <Icons.LaptopCode />
              <span>{t(`Jobs.${job.id}.Role`)}</span>
            </h3>
            <p className={`${layoutProperties.text.extraSmall}`}>
              {job.company.name} • {job.type} • {job.place}
            </p>
          </div>
          <div
            className={`flex justify-between gap-4 ${theme.foregroundSecondary} ${layoutProperties.text.extraSmall}`}
          >
            <span>
              <Icons.Calendar /> {formatDate(job.start)} {"- "}
              {formatDate(job.end as Date)}
            </span>
            <span>
              <Icons.Location /> {job.company.city}
            </span>
          </div>
        </div>

        <AnimatePresence mode={"wait"}>
          {isActive ? (
            <motion.div
              key={"expanded-content"}
              variants={variants}
              initial={"initial"}
              animate={{
                ...variants.animate,
                transition: { delay: animationProperties.durations.short },
              }}
              exit={"exit"}
              className={"space-y-2"}
            >
              {Object.entries(job.features).map(([feature, items]) => (
                <ExpandingList
                  key={feature}
                  className={`p-2 rounded-sm border-1 ${theme.borderSecondary}`}
                  id={feature}
                  isExpanded={listsExpandStatuses[feature]}
                  onExpand={(id) => {
                    setListsExpandStatuses(
                      (prev) =>
                        ({
                          ...Object.fromEntries(
                            Object.keys(prev).map((list) => [list, false]),
                          ),
                          [id]: true,
                        }) as { [key in keyof JobFeatures]: boolean },
                    );
                  }}
                  title={t(
                    `JobsFeatures.${
                      feature.charAt(0).toUpperCase() + feature.slice(1)
                    }`,
                  )}
                  items={items.map((item) =>
                    t(
                      `Jobs.${job.id}.${
                        feature.charAt(0).toUpperCase() + feature.slice(1)
                      }.${item}`,
                    ),
                  )}
                  renderItem={(item) => <TextWithCode text={item} />}
                />
              ))}
              <div className={"flex flex-wrap gap-2"}>
                {job.technologiesUsed.map((tech) => (
                  <Aspect key={tech} name={tech} />
                ))}
              </div>
            </motion.div>
          ) : (
            <span className={`mx-auto ${layoutProperties.text.extraSmall}`}>
              Click the bar to see more details
            </span>
          )}
        </AnimatePresence>
      </motion.div>
    </Container.AnimateChangeInHeight>
  );
};

export default ExperienceTimeline;
