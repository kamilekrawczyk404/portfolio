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

  // const projectPhotos = {
  //   "and-wiert": [
  //     {
  //       src: "/projects/and-wiert/ai-generator.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/blog-post.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/blog.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/contact.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/photo-full.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/photos-gallery.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/post-edit-1.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/post-edit-2.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/post-edit-3.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/site-3.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/view-1.png",
  //       alt: "project photo - and-wiert",
  //     },
  //     {
  //       src: "/projects/and-wiert/view-2.png",
  //       alt: "project photo - and-wiert",
  //     },
  //   ],
  //   "cpp-weather-app": [
  //     {
  //       src: "/projects/cpp-weather-app/view-1.png",
  //       alt: "project photo - cpp-weather-app",
  //     },
  //   ],
  //   flashcards: [
  //     {
  //       src: "/projects/flashcards/view-1.png",
  //       alt: "project photo - flashcards",
  //     },
  //     {
  //       src: "/projects/flashcards/view-10.png",
  //       alt: "project photo - flashcards",
  //     },
  //     {
  //       src: "/projects/flashcards/view-2.png",
  //       alt: "project photo - flashcards",
  //     },
  //     {
  //       src: "/projects/flashcards/view-3.png",
  //       alt: "project photo - flashcards",
  //     },
  //     {
  //       src: "/projects/flashcards/view-4.png",
  //       alt: "project photo - flashcards",
  //     },
  //     {
  //       src: "/projects/flashcards/view-5.png",
  //       alt: "project photo - flashcards",
  //     },
  //     {
  //       src: "/projects/flashcards/view-6.png",
  //       alt: "project photo - flashcards",
  //     },
  //     {
  //       src: "/projects/flashcards/view-8.png",
  //       alt: "project photo - flashcards",
  //     },
  //     {
  //       src: "/projects/flashcards/view-9.png",
  //       alt: "project photo - flashcards",
  //     },
  //   ],
  //   "pogodynka-frontend": [
  //     {
  //       src: "/projects/pogodynka-frontend/view-1.png",
  //       alt: "project photo - pogodynka-frontend",
  //     },
  //     {
  //       src: "/projects/pogodynka-frontend/view-2.png",
  //       alt: "project photo - pogodynka-frontend",
  //     },
  //     {
  //       src: "/projects/pogodynka-frontend/view-3.png",
  //       alt: "project photo - pogodynka-frontend",
  //     },
  //     {
  //       src: "/projects/pogodynka-frontend/view-4.png",
  //       alt: "project photo - pogodynka-frontend",
  //     },
  //   ],
  //   portfolio: [
  //     {
  //       src: "/projects/portfolio/view-1.png",
  //       alt: "project photo - portfolio",
  //     },
  //   ],
  //   "vet-clinic": [
  //     {
  //       src: "/projects/vet-clinic/view-1.png",
  //       alt: "project photo - vet-clinic",
  //     },
  //     {
  //       src: "/projects/vet-clinic/view-2.png",
  //       alt: "project photo - vet-clinic",
  //     },
  //     {
  //       src: "/projects/vet-clinic/view-3.png",
  //       alt: "project photo - vet-clinic",
  //     },
  //     {
  //       src: "/projects/vet-clinic/view-4.png",
  //       alt: "project photo - vet-clinic",
  //     },
  //     {
  //       src: "/projects/vet-clinic/view-5.png",
  //       alt: "project photo - vet-clinic",
  //     },
  //   ],
  //   "wpf-advanced-calculator": [
  //     {
  //       src: "/projects/wpf-advanced-calculator/view-1.png",
  //       alt: "project photo - wpf-advanced-calculator",
  //     },
  //   ],
  // };

  const projectPhotos = await getProjectsPhotos();

  return (
    <div className={`flex flex-col relative bg-transparent`}>
      <Hero />
      <Technologies />
      <Projects apiKey={apiKey} projectsPhotos={projectPhotos} />
    </div>
  );
}
