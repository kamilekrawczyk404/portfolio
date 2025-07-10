"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import GroupSection from "@/components/GroupSection";
import Categories from "@/components/Categories";
import Selector from "@/components/Selector";
import useMousePosition from "@/hooks/useMousePosition";
import ProjectPreview from "@/components/project/ProjectPreview";
import { projectsList } from "@/projectsList";

const getFormattedInfo = (projects, projectsPhotos, githubRepos) => {
  const languages = [];

  console.log("photos", projectsPhotos);

  const formattedProjects = projects.map((project) => {
    // get information about current project from GitHub
    // const { html_url, created_at, updated_at, visibility, default_branch } =
    //   githubRepos.findIndex((r) => r.name === project.githubRepoName);
    // console.log("lan", githubRepos);

    // if (languages) {
    //   languages.forEach((lan) => {
    //     if (!languages.includes(lan)) {
    //       languages.push(lan);
    //     }
    //   });
    // }

    return {
      ...project,
      // add gallery navigation item and correspondent photos
      description: [
        { title: "Galeria zdjęć", photos: projectsPhotos[project.name] },
        ...project.description,
      ],
      thumbnail: `/projects/${project.name}/view-1.png`,
      // updatedAt: updated_at,
      // createdAt: created_at,
      // defaultBranch: default_branch,
      // url: html_url,
      // languages,
      // visibility,
    };
  });

  console.log("formatted", formattedProjects);

  return {
    projects: formattedProjects,
    languages,
  };
};

const Projects = ({ githubRepos, projectsPhotos }) => {
  const { projects, languages } = useMemo(() => {
    return getFormattedInfo(
      projectsList,
      projectsPhotos,
      githubRepos.repositories,
    );
  }, [githubRepos, projectsPhotos]);

  const sortingTypes = useMemo(
    () => [
      { name: "Creation date (Ascending)", type: "creation-date-asc" },
      { name: "Creation date (Descending)", type: "creation-date-desc" },
      { name: "Last commit (Ascending)", type: "last-commit-asc" },
      { name: "Last commit (Descending)", type: "last-commit-asc" },
    ],
    [],
  );

  // const [projects, setProjects] = useState([]);
  const [selectedSortingType, setSelectedSortingType] = useState(
    sortingTypes[0].type,
  );
  const [selectedFilters, setSelectedFilters] = useState([]); // Renamed for clarity

  // Function to filter projects based on selected languages
  const filterProjects = useCallback((items, currentFilters) => {
    if (currentFilters.length === 0) {
      return items; // If no filters selected, return all items
    }
    return items.filter((item) =>
      currentFilters.some((filter) => item.languages.includes(filter.name)),
    );
  }, []);

  // Function to sort projects based on selected sorting type
  const sortProjects = useCallback((items, sortingType) => {
    // Create a shallow copy to avoid mutating the original array
    if (!items.length) return;

    const sortedItems = [...items];
    switch (sortingType) {
      case "date-asc":
        // Assuming projects have a 'date' property or similar for sorting
        // For now, no date is available, so this will keep original order
        // You'd need to add a 'date' property to your project objects for this to work
        return sortedItems;
      case "date-desc":
        // Assuming projects have a 'date' property or similar for sorting
        return sortedItems;
      case "title-asc":
        return sortedItems.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return sortedItems.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sortedItems;
    }
  }, []);

  // Memoized list of filtered and sorted projects
  const filteredAndSortedProjects = useMemo(() => {
    let currentProjects = projects;
    currentProjects = filterProjects(currentProjects, selectedFilters);
    // currentProjects = sortProjects(currentProjects, selectedSortingType);
    return currentProjects;
  }, [selectedFilters, selectedSortingType, filterProjects, sortProjects]);

  const mousePosition = useMousePosition();

  const handleFilterChange = useCallback((updatedFilters) => {
    setSelectedFilters(updatedFilters);
  }, []);

  const handleSortingChange = useCallback((item) => {
    setSelectedSortingType(item.type);
  }, []);

  return (
    <PageContainer section>
      <SectionTitle title={"Projects"}>
        <div className={"flex gap-x-4"}>
          <GroupSection title={"Filter by languages"}>
            <Categories
              categories={languages}
              render={(item) => item}
              callback={handleFilterChange} // Use useCallback wrapped function
            />
          </GroupSection>
          <GroupSection title={"Sort by"}>
            <Selector
              items={sortingTypes}
              render={(item) => item.name}
              callback={handleSortingChange} // Use useCallback wrapped function
            />
          </GroupSection>
        </div>
      </SectionTitle>
      <div className={"relative grid grid-cols-2 basis-full relative"}>
        {filteredAndSortedProjects?.length > 0 ? ( // Check for length > 0
          filteredAndSortedProjects.map((project, index) => (
            <ProjectPreview
              key={project.name || index} // Use a more stable key if possible, like project.name
              project={project}
              mousePosition={mousePosition}
            />
          ))
        ) : projects.length > 0 && selectedFilters.length > 0 ? (
          <p className="col-span-2 text-center text-gray-500">
            No projects match the selected filters.
          </p>
        ) : projects === null ? (
          <p className="col-span-2 text-center text-gray-500">
            Loading projects...
          </p>
        ) : (
          <p className="col-span-2 text-center text-gray-500">
            No projects available.
          </p>
        )}
      </div>
    </PageContainer>
  );
};

export default Projects;
