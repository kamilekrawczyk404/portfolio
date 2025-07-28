import Hero from "@/views/Hero";
import Technologies from "@/views/Technologies";
import Projects from "@/views/Projects";
import Contact from "@/views/Contact";

const fetcher = (url, params = {}) =>
  fetch(
    `${
      process.env.NODE_ENV === "production"
        ? `https://portfolio-ruby-theta-21.vercel.app`
        : `http://localhost:${process.env.PORT || 3000}`
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
  const apiKey = process.env.INTERNAL_API_SECRET;

  const projectPhotos = await getProjectsPhotos();

  return (
    <div className={`flex flex-col relative bg-transparent`}>
      <Hero />
      <Technologies />
      <Projects apiKey={apiKey} projectsPhotos={projectPhotos} />
      <Contact />
    </div>
  );
}
