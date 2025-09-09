"use client";
import React, { useCallback, useMemo, useState } from "react";
import Categories from "@/components/Categories";
import Selector from "@/components/Selector";
import ProjectPreview from "@/components/project/ProjectPreview";
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
import * as url from "node:url";

type SortingType = {
  type: "CreatedDesc" | "CreatedAsc" | "UpdatedDesc" | "UpdatedAsc";
};

const sortingTypes: SortingType[] = [
  { type: "CreatedDesc" },
  { type: "CreatedAsc" },
  { type: "UpdatedDesc" },
  { type: "UpdatedAsc" },
];

type Technologies = {
  title: string;
  values: string[];
};

export type ProjectPhoto = {
  src: string;
  alt: string;
};

type ProjectDescription = {
  githubRepoName: string;
  keyFeaturesTitles: string[];
  technologies: Technologies[];
  link?: string;
};

export type ProjectLanguage = { [k in string]: number };

type Repository = {
  name: string;
  createdAt: string;
  updatedAt: string;
  defaultBranch: string;
  languages: ProjectLanguage;
  visibility: "public" | "private";
  url: string;
};

export type View = {
  type: "gallery" | "description" | "keyFeatures";
  photos?: ProjectPhoto[];
};

export type FormattedProject = ProjectDescription & {
  thumbnail: string;
  views: View[];
  repository: Repository;
};

// Join all necessary information about project (its photos, repository information, etc.)
const getFormattedProject = (
  projectDescription: ProjectDescription,
  projectPhotos: ProjectPhoto[],
  repositories: Repository[],
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

  const { cached, error, isLoading, setForceRefresh } =
    useCachedGithubRepos(apiKey);

  const projects = useMemo(() => {
    if (cached && cached.repositories) {
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
  const filteredAndSortedProjects = useMemo(() => {
    let currentProjects = projects;

    currentProjects = filterProjects(currentProjects, selectedFilters);
    currentProjects = sortProjects(currentProjects, selectedSortingType);

    return currentProjects;
  }, [selectedFilters, selectedSortingType, filterProjects, sortProjects]);

  const handleFilterChange = useCallback((updatedFilters: string[]) => {
    setSelectedFilters(updatedFilters);
  }, []);

  const handleSortingChange = useCallback((item: SortingType) => {
    setSelectedSortingType(item.type);
  }, []);

  return (
    <PageContainer section id={"projects"}>
      <SectionTitle title={t("Title")}>
        <div className={"flex flex-col gap-2"}>
          <GroupSection
            title={t("Filter.Title")}
            delay={animationProperties.durations.long}
          >
            {!isLoading ? (
              <Categories
                whileInView
                delay={animationProperties.durations.long}
                categories={cached.projectsLanguages}
                render={(item) => item}
                callback={handleFilterChange}
              />
            ) : (
              <VerticallyAppearingText
                text={"Zaczekaj, trwa ładowanie filtrów..."}
                className={"h-[1.5rem] text-gray-500"}
              />
            )}
          </GroupSection>
          <GroupSection
            title={t("Selector.Title")}
            className={"w-fit"}
            delay={animationProperties.durations.long}
          >
            <Selector
              whileInView
              delay={animationProperties.durations.long}
              items={sortingTypes}
              render={(item) => {
                if (["CreatedDesc", "UpdatedDesc"].includes(item.type)) {
                  return (
                    <span>
                      {t(`Selector.Values.${item.type}`)}
                      <Icons.Arrow className={"rotate-90 ml-2 text-sm"} />
                    </span>
                  );
                } else {
                  return (
                    <span>
                      {t(`Selector.Values.${item.type}`)}
                      <Icons.Arrow className={"-rotate-90 ml-2 text-sm"} />
                    </span>
                  );
                }
              }}
              callback={handleSortingChange}
            />
          </GroupSection>
        </div>
      </SectionTitle>
      <AppearingContainer
        className={`relative grid md:grid-cols-2 grid-cols-1 basis-full relative ${layoutProperties.gap.horizontal.large}`}
      >
        {filteredAndSortedProjects?.length > 0 ? (
          filteredAndSortedProjects.map((project, index) => (
            <ProjectPreview
              key={project.githubRepoName || index}
              project={project}
            />
          ))
        ) : projects.length > 0 && selectedFilters.length > 0 ? (
          <VerticallyAppearingText
            className={`col-span-2 text-center text-gray-500`}
            text={"No projects match the selected filters."}
          />
        ) : isLoading ? (
          <VerticallyAppearingText
            className={"col-span-2 text-center text-gray-500"}
            text={"Loading projects..."}
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
