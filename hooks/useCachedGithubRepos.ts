"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { GithubRepo } from "@/types/types";
import { projectsList } from "@/projectsList";

type DataState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: any };

type CachedData = null | {
  repositories: GithubRepo[];
  projectsLanguages: string[];
};

const GITHUB_REPOS_CACHE_KEY = "githubReposCache";
const CACHE_EXPIRY_TIME = 60 * 60 * 1000;

const useCachedGithubRepos = (apiKey: string) => {
  const [status, setStatus] = useState<DataState>({ status: "idle" });
  const [isForcedRefresh, setIsForcedRefresh] = useState(false);

  const fetchGithubRepos = useCallback(async (forceRefresh = false) => {
    setStatus({ status: "loading" });

    const now = Date.now();
    const cachedData = localStorage.getItem(GITHUB_REPOS_CACHE_KEY);

    if (cachedData && !forceRefresh) {
      try {
        const parsedCache = JSON.parse(cachedData);
        const data: CachedData = parsedCache.data;
        const timestamp: number = parsedCache.timestamp;

        // Check:
        // Whether some project has been added to the list of the projects
        // Expiry time
        if (
          data.repositories.length === projectsList.length &&
          now - timestamp < CACHE_EXPIRY_TIME
        ) {
          setStatus({ status: "success", data });
          return;
        }
      } catch (err) {
        console.error(`Failed to parse cached Github repositories: ${err}`);
        localStorage.removeItem(GITHUB_REPOS_CACHE_KEY);
      }
    }

    // Fetching data
    const response: {
      error: any;
      data: CachedData;
    } = await axios.get("/api/repos", {
      headers: {
        "X-Internal-Api-Secret": apiKey,
      },
    });

    if (response.error) {
      setStatus({ status: "error", error: response.error });
    } else {
      setStatus({
        status: "success",
        data: response.data,
      });

      const newTimestamp = Date.now();

      try {
        localStorage.setItem(
          GITHUB_REPOS_CACHE_KEY,
          JSON.stringify({
            data: response.data,
            timestamp: newTimestamp,
          }),
        );
      } catch (error) {
        console.error(`Failed to cache fetched Github repositories: ${error}`);
      }
    }
  }, []);

  useEffect(() => {
    fetchGithubRepos(isForcedRefresh);
  }, [isForcedRefresh]);

  return {
    cached: status.status === "success" ? status.data : [],
    isLoading: status.status === "loading" || status.status === "idle",
    error: status.status === "error" ? status.error : null,
    setForceRefresh: setIsForcedRefresh,
  };
};

export default useCachedGithubRepos;
