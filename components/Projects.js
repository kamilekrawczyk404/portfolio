"use client";
import React, { useCallback, useMemo, useState } from "react";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import GroupSection from "@/components/GroupSection";
import Categories from "@/components/Categories";
import Selector from "@/components/Selector";
import ProjectPreview from "@/components/project/ProjectPreview";
import { projectsList } from "@/projectsList";
import useCachedGithubRepos from "@/hooks/useCachedGithubRepos";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import { layoutProperties } from "@/layout";

const sortingTypes = [
  { name: "Created: Newest First", type: "created-desc" },
  { name: "Created: Oldest First", type: "created-asc" },
  { name: "Updated: Most Recent", type: "updated-desc" },
  { name: "Updated: Least Recent", type: "updated-asc" },
];

// Join all necessary information about project (its photos, repository information, etc.)
const getFormattedProjects = (
  projectDescription,
  projectsPhotos,
  repositories,
) => {
  const repository = repositories.filter(
    (r) => r.name === projectDescription.githubRepoName,
  )[0];
  const projectPhotos = projectsPhotos[projectDescription.githubRepoName];

  return {
    ...projectDescription,
    thumbnail: `/projects/${projectDescription.githubRepoName}/view-1.png`,
    views: [
      // Add gallery view
      { title: "Galeria", photos: projectPhotos },
      ...projectDescription.views,
    ],
    repository: repository,
  };
};
const Projects = ({ projectsPhotos, apiKey }) => {
  const { cached, error, isLoading, setForceRefresh } =
    useCachedGithubRepos(apiKey);

  const projects = useMemo(() => {
    if (cached && cached.repositories) {
      return projectsList.map((p) =>
        getFormattedProjects(p, projectsPhotos, cached.repositories),
      );
    } else {
      return [];
    }
  }, [cached, projectsPhotos]);

  const [selectedSortingType, setSelectedSortingType] = useState(
    sortingTypes[1].type,
  );
  const [selectedFilters, setSelectedFilters] = useState([]); // Renamed for clarity

  // Function to filter projects based on selected languages
  const filterProjects = useCallback((items, currentFilters) => {
    if (currentFilters.length === 0) {
      return items;
    }

    return items.filter((item) =>
      currentFilters.some((filter) =>
        Object.keys(item.repository.languages).includes(filter),
      ),
    );
  }, []);

  // Function to sort projects based on selected sorting type
  const sortProjects = useCallback((items, sortingType) => {
    if (!items.length) return;

    const sortedItems = [...items];
    switch (sortingType) {
      case "updated-asc":
        return sortedItems.sort(
          (a, b) =>
            new Date(a.repository.updatedAt) - new Date(b.repository.updatedAt),
        );
      case "updated-desc":
        return sortedItems.sort(
          (a, b) =>
            new Date(b.repository.updatedAt) - new Date(a.repository.updatedAt),
        );
      case "created-asc":
        return sortedItems.sort(
          (a, b) =>
            new Date(a.repository.createdAt) - new Date(b.repository.createdAt),
        );
      case "created-desc":
        return sortedItems.sort(
          (a, b) =>
            new Date(b.repository.createdAt) - new Date(a.repository.createdAt),
        );
      default:
        return sortedItems;
    }
  }, []);

  // Memoized list of filtered and sorted projects
  const filteredAndSortedProjects = useMemo(() => {
    let currentProjects = projects;
    currentProjects = filterProjects(currentProjects, selectedFilters);
    currentProjects = sortProjects(currentProjects, selectedSortingType);
    return currentProjects;
  }, [selectedFilters, selectedSortingType, filterProjects, sortProjects]);

  const handleFilterChange = useCallback((updatedFilters) => {
    setSelectedFilters(updatedFilters);
  }, []);

  const handleSortingChange = useCallback((item) => {
    setSelectedSortingType(item.type);
  }, []);

  console.log("error", error);

  return (
    <PageContainer section>
      <SectionTitle title={"Projects"}>
        <div className={"flex flex-col gap-2"}>
          <GroupSection title={"Filter by languages"}>
            {!isLoading ? (
              <Categories
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
          <GroupSection title={"Sort by"} className={"w-fit"}>
            <Selector
              items={sortingTypes}
              render={(item) => item.name}
              callback={handleSortingChange}
            />
          </GroupSection>
        </div>
      </SectionTitle>
      <div
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
      </div>
    </PageContainer>
  );
};

export default Projects;
