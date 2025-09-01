import Hero from "@/views/Hero";
import Technologies from "@/views/Technologies";
import Projects from "@/views/Projects";
import Contact from "@/views/Contact";
import Footer from "@/views/Footer";
import { getTranslations } from "next-intl/server";

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

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const metadata = {
    title: t("title"),
    description: t("description"),
    keywords: t("tags").split(", "),
    locale: t("locale"),
    creator: "Kamil Krawczyk",
    email: "kamilekkrawczyk404@gmail.com",
    phone: "+48698536476",
    url: "https://kamilekrawczyk.pl",
  };

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    creator: metadata.creator,
    formatDetection: {
      email: metadata.email,
      telephone: metadata.phone,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    metadataBase: new URL(metadata.url),
    alternates: {
      canonical: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      creator: "@kamileczekkkk",
      images: [`${metadata.url}/hero/myself.webp`], // Must be an absolute URL
    },
    icons: {
      icon: `${metadata.url}/icon/icon.webp`,
      apple: `${metadata.url}/icon/icon.webp`,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: metadata.url,
      siteName: "Kamil's Portfolio",
      images: [
        {
          url: `${metadata.url}/hero/myself.webp`, // Must be an absolute URL
          width: 800,
          height: 600,
          alt: "Kamil's portfolio image",
        },
      ],
      locale: metadata.locale,
      type: "website",
    },
  };
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
