import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";

const fetcher = (url, params = {}) =>
  fetch(
    `${
      process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:3000"
    }${url}`,
    params,
  );

async function getGitHubRepos() {
  try {
    const response = await fetcher(`/api/repos`, {
      headers: {
        "X-Internal-Api-Secret": process.env.INTERNAL_API_SECRET || "",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cannot get repositories", errorData);
      return {
        error:
          errorData.error || "Failed to fetch repositories from internal API.",
      };
    }

    const repos = await response.json();
    return { repositories: repos };
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return { error: "Internal server error during repository fetch." };
  }
}

async function getProjectsPhotos() {
  const response = await fetcher("/api/projects");

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Cannot get projects directories");
    return {
      error: errorData.error || "Failed to fetch project directories",
    };
  }

  return [await response.json()];
}

export default async function RootPage() {
  const t = getTranslations("HomePage");

  const repos = await getGitHubRepos();
  const projectPhotos = await getProjectsPhotos();

  console.log("repp", repos);

  return (
    <div className={`flex flex-col relative bg-transparent`}>
      <Hero />
      <Technologies />
      <Projects githubRepos={repos} projectsPhotos={projectPhotos} />
    </div>
  );
}
