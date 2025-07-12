import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";

const fetcher = (url, params = {}) =>
  fetch(
    `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
    }${url}`,
    params,
  );

async function getProjectsPhotos() {
  const response = await fetcher("/api/projects");

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Cannot get projects directories");
    return {
      error: errorData.error || "Failed to fetch project directories",
    };
  }

  return await response.json();
}

export default async function RootPage() {
  const t = getTranslations("HomePage");

  const apiKey = process.env.INTERNAL_API_SECRET;

  const projectPhotos = await getProjectsPhotos();

  return (
    <div className={`flex flex-col relative bg-transparent`}>
      <Hero />
      <Technologies />
      <Projects apiKey={apiKey} projectsPhotos={projectPhotos} />
    </div>
  );
}
