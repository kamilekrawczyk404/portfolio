"use client";
import React, { useCallback, useMemo, useState } from "react";
import Categories from "@/components/Categories";
import Selector from "@/components/Selector";
import { projectsList } from "@/projectsList";
import useCachedGithubRepos from "@/hooks/useCachedGithubRepos";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import { layoutProperties } from "@/layout";
import { useTranslations } from "next-intl";
import { Icons } from "@/components/Icons";
import GroupSection from "@/components/containers/GroupSection";
import SectionTitle from "@/components/containers/SectionTitle";
import PageContainer from "@/components/containers/PageContainer";
import { animationProperties } from "@/animations";
import AppearingContainer from "@/components/containers/AppearingContainer";
import Button from "@/components/buttons/Button";
import { AnimatePresence } from "framer-motion";
import {
  FormattedProject,
  GithubRepo,
  ProjectDescription,
} from "@/types/types";
import ProjectsList from "@/components/project/ProjectsList";

type SortingType = {
  type: "CreatedDesc" | "CreatedAsc" | "UpdatedDesc" | "UpdatedAsc";
};

const sortingTypes: SortingType[] = [
  { type: "CreatedDesc" },
  { type: "CreatedAsc" },
  { type: "UpdatedDesc" },
  { type: "UpdatedAsc" },
];

export type ProjectPhoto = {
  src: string;
  alt: string;
};

export type View = {
  type: "gallery" | "description" | "keyFeatures";
  photos?: ProjectPhoto[];
};

// Join all necessary information about project (its photos, repository information, etc.)
const getFormattedProject = (
  projectDescription: ProjectDescription,
  projectPhotos: ProjectPhoto[],
  repositories: GithubRepo[],
): FormattedProject => {
  const repository = repositories.filter(
    (r) => r.name === projectDescription.githubRepoName,
  )[0];

  return {
    ...projectDescription,
    thumbnail: `/projects/${projectDescription.githubRepoName}/view-1.png`,
    views: [
      // Add gallery view
      { type: "gallery", photos: projectPhotos },
      { type: "description" },
      { type: "keyFeatures" },
    ],
    repository,
  };
};

type ProjectProps = {
  projectsPhotos: { [key in string]: ProjectPhoto[] };
  apiKey: string;
};

const Projects = ({ projectsPhotos, apiKey }: ProjectProps) => {
  const t = useTranslations("HomePage.ProjectsSection");

  const { cached, error, isLoading, refresh } = useCachedGithubRepos(apiKey);

  const projects = useMemo<FormattedProject[]>(() => {
    if (cached && cached.repositories.length > 0) {
      return projectsList.map((p) =>
        getFormattedProject(
          p,
          projectsPhotos[p.githubRepoName],
          cached.repositories,
        ),
      );
    } else {
      return [];
    }
  }, [cached, projectsPhotos]);

  const [selectedSortingType, setSelectedSortingType] = useState<
    SortingType["type"]
  >(sortingTypes[1].type);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]); // Renamed for clarity

  // Function to filter projects based on selected languages
  const filterProjects = useCallback(
    (items: FormattedProject[], currentFilters: string[]) => {
      if (currentFilters.length === 0) {
        return items;
      }

      return items.filter((item) =>
        currentFilters.some((filter) =>
          Object.keys(item.repository.languages).includes(filter),
        ),
      );
    },
    [],
  );

  // Function to sort projects based on selected sorting type
  const sortProjects = useCallback(
    (items: FormattedProject[], sortingType: SortingType["type"]) => {
      if (!items.length) return;

      const sortedItems = [...items];
      switch (sortingType) {
        case "UpdatedAsc":
          return sortedItems.sort(
            (a, b) =>
              new Date(a.repository.updatedAt).getTime() -
              new Date(b.repository.updatedAt).getTime(),
          );
        case "UpdatedDesc":
          return sortedItems.sort(
            (a, b) =>
              new Date(b.repository.updatedAt).getTime() -
              new Date(a.repository.updatedAt).getTime(),
          );
        case "CreatedAsc":
          return sortedItems.sort(
            (a, b) =>
              new Date(a.repository.createdAt).getTime() -
              new Date(b.repository.createdAt).getTime(),
          );
        case "CreatedDesc":
          return sortedItems.sort(
            (a, b) =>
              new Date(b.repository.createdAt).getTime() -
              new Date(a.repository.createdAt).getTime(),
          );
        default:
          return sortedItems;
      }
    },
    [],
  );
  // Memoized list of filtered and sorted projects
  const filteredAndSortedProjects = useMemo<FormattedProject[]>(() => {
    if (!projects.length) return;

    let currentProjects = projects;

    currentProjects = filterProjects(currentProjects, selectedFilters);
    currentProjects = sortProjects(currentProjects, selectedSortingType);

    return currentProjects;
  }, [selectedFilters, selectedSortingType, projects]);

  const handleFilterChange = useCallback((updatedFilters: string[]) => {
    setSelectedFilters(updatedFilters);
  }, []);

  const handleSortingChange = useCallback((item: SortingType) => {
    setSelectedSortingType(item.type);
  }, []);

  return (
    <PageContainer section id={"projects"}>
      <SectionTitle title={t("Title")}>
        <div className={"flex justify-between items-end w-full"}>
          <div className={"flex flex-col gap-2"}>
            <AnimatePresence mode={"popLayout"}>
              <GroupSection
                title={t("Filter.Title")}
                delay={animationProperties.durations.long}
              >
                {!isLoading ? (
                  <Categories
                    whileInView={true}
                    delay={animationProperties.durations.long}
                    categories={cached.projectsLanguages}
                    render={(item) => item}
                    callback={handleFilterChange}
                  />
                ) : (
                  <VerticallyAppearingText
                    text={t("Filter.Loading")}
                    className={"h-[1.5rem] text-gray-500"}
                  />
                )}
              </GroupSection>
            </AnimatePresence>
            <GroupSection
              title={t("Sorting.Title")}
              className={"w-fit"}
              delay={animationProperties.durations.long}
            >
              <Selector
                dataTestId={"projects-sorting-selector"}
                disabled={isLoading}
                whileInView={true}
                delay={animationProperties.durations.long}
                items={sortingTypes}
                render={(item) => {
                  if (["CreatedDesc", "UpdatedDesc"].includes(item.type)) {
                    return (
                      <span className={"inline-flex items-center gap-1 px-1"}>
                        <Icons.Arrow className={"rotate-90 text-sm"} />
                        {t(`Sorting.Values.${item.type}`)}
                      </span>
                    );
                  } else {
                    return (
                      <span className={"inline-flex items-center gap-1 px-1"}>
                        <Icons.Arrow className={"-rotate-90 text-sm"} />
                        {t(`Sorting.Values.${item.type}`)}
                      </span>
                    );
                  }
                }}
                callback={handleSortingChange}
              />
            </GroupSection>
          </div>

          <Button
            datatest-id={"refresh-projects-button"}
            navigation
            className={"inline-flex gap-1 items-center"}
            onClick={async () => {
              refresh();
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: animationProperties.durations.long,
            }}
          >
            <Icons.Refresh />
            <span className={"text-nowrap"}>{t("RefreshProjectsButton")}</span>
          </Button>
        </div>
      </SectionTitle>
      <AppearingContainer
        className={`relative basis-full relative ${layoutProperties.gap.horizontal.large}`}
      >
        {isLoading ? (
          <VerticallyAppearingText
            className={"col-span-2 text-center text-gray-500"}
            text={t("Loading")}
          />
        ) : filteredAndSortedProjects?.length > 0 ? (
          <ProjectsList projects={filteredAndSortedProjects} />
        ) : projects.length > 0 && selectedFilters.length > 0 ? (
          <VerticallyAppearingText
            className={`col-span-2 text-center text-gray-500`}
            text={"No projects match the selected filters."}
          />
        ) : (
          <VerticallyAppearingText
            className={"col-span-2 text-center text-gray-500"}
            text={"No projects available."}
          />
        )}
      </AppearingContainer>
    </PageContainer>
  );
};

export default Projects;
