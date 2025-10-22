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
import { useTranslations } from "next-intl";
import ExpandingList from "@/components/lists/ExpandingList";
import TextWithCode from "@/components/text/TextWithCode";

type JobFeatures = {
  responsibilities: string[];
  achievements: string[];
  learnings: string[];
};

type JobDescription = {
  id: number;
  role: string;
  place: "Remote" | "Hybrid" | "OnSite";
  type:
    | "FullTime"
    | "PartTime"
    | "Temporary"
    | "Freelance"
    | "Internship"
    | "Contract";
  company: {
    name: string;
    city: string;
  };
  features: JobFeatures;
};

type ExperienceTimeEvent = TimelineEvent<JobDescription>;

type ExperienceTimeLineProps = {
  locale: string;
};

const jobs: ExperienceTimeEvent[] = [
  {
    id: 1,
    color: colors.languages.JavaScript,
    start: new Date("2020/10/01"),
    end: new Date("2020/11/01"),
    type: "Internship",
    role: "Intern Frontend Developer",
    place: "OnSite",
    company: { name: "Centrum Kształcenia Zawodowego", city: "Nowy Sącz, PL" },
    features: {
      responsibilities: ["Development", "Optimization", "Databases"],
      learnings: ["PHP", "REST APIs", "MySQL", "MongoDB"],
      achievements: ["BugFixes", "Testing"],
    },
  },
  {
    id: 2,
    color: colors.languages.JavaScript,
    start: new Date("2021/10/01"),
    end: new Date("2021/11/01"),
    type: "Internship",
    role: "Intern Frontend Developer",
    place: "OnSite",
    company: { name: "Centrum Kształcenia Zawodowego", city: "Nowy Sącz, PL" },
    features: {
      responsibilities: ["Development", "Optimization", "Databases"],
      learnings: ["PHP", "REST APIs", "MySQL", "MongoDB"],
      achievements: ["BugFixes", "Testing"],
    },
  },
  {
    id: 3,
    role: "Fullstack Developer",
    color: colors.languages.TypeScript,
    start: new Date("2024/02/10"),
    end: new Date("2025/02/23"),
    type: "Contract",
    place: "Remote",
    company: { name: "And-Wiert Studnie Głębinowe", city: "Gromnik, PL" },
    features: {
      responsibilities: ["Web Design", "Development", "Blog", "Deployment"],
      learnings: ["NextJS", "SEO", "AI Integration", "Docker"],
      achievements: ["SuccessfulLaunch", "Performance", "SEOImprovement"],
    },
  },
  {
    id: 4,
    color: "#1dd3b0",
    start: new Date("2024/09/15"),
    end: "present",
    role: "Junior Frontend Developer",
    type: "Contract",
    place: "Remote",
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
        return new Date(initialEnd.setMonth(initialEnd.getMonth()));
      });
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []); // Only runs once on mount

  const startDate = new Date("2020/01/01");

  const renderJobEvent = useCallback(
    (event: TimelineEvent<JobDescription>, isActive: boolean) => (
      <Job job={event} isActive={isActive} locale={locale} time={time} />
    ),
    [locale],
  );

  if (!endDate || !time) return <></>;

  return (
    <Timeline
      timelineStart={startDate}
      timelineEnd={endDate}
      locale={locale}
      events={events}
      totalWidth={4000}
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
    <div className={"mb-4 relative"}>
      <Container.Default
        variants={variants}
        initial={"initial"}
        animate={"animate"}
        exit={"exit"}
        className={`flex flex-col gap-4 lg:p-4 p-2 w-xl max-w-[calc(100vw-2rem)] rounded-md overflow-hidden ${theme.background}`}
      >
        <div className={"relative flex flex-col gap-2"}>
          <div className={"space-y-1"}>
            <h3 className={`font-[500] space-x-2`}>
              {/*<Icons.LaptopCode className={`${layoutProperties.text.medium}`} />*/}
              <span className={`${layoutProperties.text.large}`}>
                {t(`Jobs.${job.id}.Role`)}
              </span>
            </h3>
            <p className={`${layoutProperties.text.small}`}>
              {job.company.name} • {t(`JobType.${job.type}`)} •{" "}
              {t(`JobPlace.${job.place}`)}
            </p>
          </div>
          <div
            className={`flex gap-4 ${theme.foregroundSecondary} ${layoutProperties.text.extraSmall}`}
          >
            <span className={"space-x-1"}>
              <Icons.Calendar className={"text-[.9rem] w-3"} />
              <span>
                {formatDate(job.start)} {"- "}
                {formatDate(job.end as Date)}
              </span>
            </span>
            <span className={"space-x-1"}>
              <Icons.Location className={"text-[.9rem] w-3"} />
              <span>{job.company.city}</span>
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
              className={`divide-y-1 border-y-1 ${theme.borderSecondary} ${theme.divideSecondary}`}
            >
              {Object.entries(job.features).map(([feature, items]) => (
                <ExpandingList
                  className={"py-2"}
                  key={feature}
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
            </motion.div>
          ) : (
            <motion.span
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: "100%" }}
              transition={{
                duration: animationProperties.durations.long,
              }}
              className={`mx-auto ${layoutProperties.text.extraSmall}`}
            >
              {t("ClickToExpand")}
            </motion.span>
          )}
        </AnimatePresence>
      </Container.Default>
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 border-x-transparent border-b-0 border-[.3rem] w-0 h-0 ${theme.borderSecondary}`}
      />
    </div>
  );
};

export default ExperienceTimeline;
