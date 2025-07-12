import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { GithubRepo } from "@/types/types";
import { projectsList } from "@/projectsList";

const getGithubAuthorizationHeaders = (accessToken: string): object => ({
  "User-Agent": "Next.js-App",
  Authorization: `token ${accessToken}`,
});

const getRepositoryLanguages = async (
  accessToken: string,
  repositoryName: string,
) => {
  return await axios(
    `https://api.github.com/repos/kamilekrawczyk404/${repositoryName}/languages`,
    { headers: getGithubAuthorizationHeaders(accessToken) },
  )
    .then((res) => res.data)
    .catch((error) => {
      console.error(
        `Error occurred while fetching repository [${repositoryName}] languages: ${error}`,
      );
      return;
    });
};

const getGithubRepositories = async (
  accessToken: string,
): Promise<{ repositories: GithubRepo[] | any[]; error: undefined | any }> => {
  return await axios
    .get("https://api.github.com/user/repos?type=all", {
      headers: getGithubAuthorizationHeaders(accessToken),
    })
    .then((res) => {
      // filtering only repositories that belongs to my account and are stored in the projects list
      // then, formatting them
      const selectedRepositories = projectsList.map((p) => p.githubRepoName);
      const formattedRepositories = res.data
        .filter(
          (repo: any) =>
            repo.owner.login === "kamilekrawczyk404" &&
            selectedRepositories.includes(repo.name),
        )
        .map((repo: any) => {
          const {
            id,
            name,
            created_at,
            updated_at,
            default_branch,
            html_url,
            visibility,
          } = repo;

          const repository: GithubRepo = {
            id: id,
            name: name,
            createdAt: created_at,
            updatedAt: updated_at,
            defaultBranch: default_branch,
            visibility,
            url: html_url,
            languages: [],
          };

          return repository;
        });

      return {
        repositories: formattedRepositories as GithubRepo[],
        error: undefined,
      };
    })
    .catch((error) => {
      console.error(
        `Error occurred while fetching Github repositories: ${error}`,
      );
      return { error, repositories: [] };
    });
};

export async function GET(request: NextRequest) {
  const apiInternalSecret = process.env.INTERNAL_API_SECRET;
  const providedSecret = request.headers.get("X-Internal-Api-Secret");

  // Unauthorized access
  if (!apiInternalSecret || providedSecret !== apiInternalSecret) {
    return NextResponse.json(
      {
        error: "Unauthorized: Invalid or missing internal API key.",
        status: 403,
      },
      { status: 403 },
    );
  }

  // GitHub access token to include private repositories
  const accessToken = process.env.GITHUB_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Cannot get github access token", status: 500 },
      { status: 500 },
    );
  }

  try {
    const response = await getGithubRepositories(accessToken);

    if (response.error) {
      return NextResponse.json(
        { error: `Failed to fetch repositories: ${response.error}` },
        { status: 500 },
      );
    }

    // We have access to the repositories, now we can fetch all languages that are used in the repositories
    // They are crucial for filtering the list of projects

    const projectsLanguages: string[] = [];
    const formatedRepositories: GithubRepo[] = [];

    for (const repository of response.repositories) {
      const languages = await getRepositoryLanguages(
        accessToken,
        repository.name,
      );

      Object.keys(languages).forEach((l) => {
        if (!projectsLanguages.includes(l)) {
          projectsLanguages.push(l);
        }
      });

      formatedRepositories.push({
        ...repository,
        languages,
      });
    }

    return NextResponse.json(
      { repositories: formatedRepositories, projectsLanguages },
      { status: 200 },
    );
  } catch (error) {
    console.error(`Error while getting repos: ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
