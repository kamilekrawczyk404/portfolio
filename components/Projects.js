"use client";
import React, { useEffect, useRef, useState } from "react";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { animationProperties, animationsTypes } from "@/animations";
import GroupSection from "@/components/GroupSection";
import Categories from "@/components/Categories";
import Selector from "@/components/Selector";
import useMousePosition from "@/hooks/useMousePosition";
import Backdrop from "@/components/Backdrop";
import ExpandingContainer from "@/components/ExpandingContainer";
import { colors } from "@/layout";
import CloseButton from "@/components/buttons/CloseButton";
import UnderlineNav from "@/components/navigation/UnderlineNav";
import MouseAttachedProjectPreview from "@/components/MouseAttachedProjectPreview";
import Project from "@/components/Project";

const Projects = () => {
  const languages = [
    { src: "Javascript" },
    { src: "PHP" },
    { src: "C#" },
    { src: "C++" },
    { src: "Python" },
    { src: "Java" },
  ];

  const dateSort = [
    { src: "Newest" },
    { src: "Oldest" },
    { src: "Title ascending" },
    { src: "Title descending" },
  ];

  const projects = [
    {
      title: "Strona dla firmy And-Wiert",
      description: [
        {
          title: "Galeria zdjęć",
          photos: [
            {
              src: "/projects/andwiert/site-1.png",
              alt: "Screenshot of the main website, view 1",
            },
            {
              src: "/projects/andwiert/site-2.png",
              alt: "Screenshot of the main website, view 2",
            },
            {
              src: "/projects/andwiert/site-3.png",
              alt: "Screenshot of the main website, view 3",
            },
            {
              src: "/projects/andwiert/ai-generator.png",
              alt: "Screenshot of the AI content generator module",
            },
            {
              src: "/projects/andwiert/blog.png",
              alt: "Screenshot of the blog page",
            },
            {
              src: "/projects/andwiert/blog-post.png",
              alt: "Screenshot of a single blog post",
            },
            {
              src: "/projects/andwiert/contact.png",
              alt: "Screenshot of the contact page",
            },
            {
              src: "/projects/andwiert/photo-full.png",
              alt: "Full view of a project photo",
            },
            {
              src: "/projects/andwiert/photos-gallery.png",
              alt: "Screenshot of the photos gallery",
            },
            {
              src: "/projects/andwiert/post-edit-1.png",
              alt: "Screenshot of post editing interface, view 1",
            },
            {
              src: "/projects/andwiert/post-edit-2.png",
              alt: "Screenshot of post editing interface, view 2",
            },
            {
              src: "/projects/andwiert/post-edit-3.png",
              alt: "Screenshot of post editing interface, view 3",
            },
          ],
        },
        {
          title: "Użyte technologie",
          description:
            "W ramach tego projektu byłem odpowiedzialny za całościowy rozwój frontendu i backendu, w tym implementację modułu AI i integrację z API Google Gemini, oraz projektowanie interfejsu użytkownika i implementację responsywności. Moje kluczowe zadania obejmowały budowę komponentów React i Next.js, zarządzanie stanem aplikacji za pomocą Redux i React Query, opracowanie logiki dla modułu AI, optymalizację wydajności strony (np. ładowanie obrazów z Pexels API i ich przetwarzanie za pomocą Sharp), implementację uwierzytelniania z NextAuth, zarządzanie bazą danych MySQL za pomocą Prisma oraz przygotowanie aplikacji do wdrożenia za pomocą Docker i OVH.",
          categories: [
            {
              title: "Frontend",
              aspects: [
                "ReactJS",
                "NextJS",
                "Tailwind-CSS",
                "Framer Motion",
                "React Query",
                "SplideJS",
                "Redux",
                "React Photo View",
                "React Hook Form",
                "SWR",
                "Node Mailer",
                "Pexels API",
                "Gemini API",
              ],
            },
            {
              title: "Backend",
              aspects: ["NextAuth", "Sitemap", "Sharp", "FS"],
            },
            {
              title: "Database",
              aspects: ["MySQL", "Prisma"],
            },
            {
              title: "Deployment & Hosting",
              aspects: ["Docker", "OVH"],
            },
          ],
        },
        {
          title: "Funkcjonalności",
          categories: [
            {
              aspects: [
                {
                  title: "Czysty i Nowoczesny Interfejs",
                  description:
                    "Minimalistyczny design z intuicyjną nawigacją, która prowadzi użytkownika przez ofertę i informacje.",
                },
                {
                  title: "Intuicyjna Nawigacja",
                  description:
                    "Użytkownicy mogą łatwo znaleźć potrzebne informacje dzięki logicznemu układowi menu i sekcji.",
                },
                {
                  title: "Animacje i Interakcje",
                  description:
                    "Wykorzystanie biblioteki Framer Motion do płynnych animacji, takich jak dynamiczne paski postępu w sekcji technologii czy animowane przejścia karuzeli, znacząco poprawia wrażenia estetyczne i interaktywność strony.",
                },
                {
                  title: "Prezentacja Usług",
                  description:
                    "Szczegółowy opis oferowanych usług, takich jak wiercenie studni, montaż rur, dobór pomp, czyszczenie i konserwacja, oraz wykonanie przyłączy wodnych. Każda usługa jest jasno przedstawiona, aby potencjalny klient mógł szybko zrozumieć zakres działalności firmy.",
                },
                {
                  title: "Sekcja Kontaktowa",
                  description:
                    "Intuicyjny formularz kontaktowy oraz widoczne dane teleadresowe, ułatwiające szybkie nawiązanie kontaktu i zapytanie o ofertę.",
                },
                {
                  title: "Dynamiczny Blog/Artykuły",
                  description:
                    "Sekcja z artykułami eksperckimi na temat studni głębinowych, wyboru lokalizacji, aspektów prawnych i środowiskowych. Ta część pełni funkcję edukacyjną i buduje autorytet firmy w branży.",
                },
                {
                  title: "Responsywny Design",
                  description:
                    "Strona jest w pełni responsywna, co zapewnia optymalne wyświetlanie i użyteczność na różnych urządzeniach – od komputerów stacjonarnych po tablety i smartfony.",
                },
                {
                  title: "Generator Postów AI",
                  description:
                    "Na podstawie podanych słów kluczowych lub krótkich zarysów, moduł AI jest w stanie wygenerować pełne artykuły blogowe, oszczędzając czas i zasoby potrzebne na tworzenie contentu.",
                },
                {
                  title: "Wsparcie SEO",
                  description:
                    "AI może pomóc w tworzeniu treści zoptymalizowanych pod kątem wyszukiwarek, zwiększając widoczność strony w wynikach wyszukiwania.",
                },
                {
                  title: "Personalizacja posta",
                  description:
                    "Generowane treści mogą być następnie edytowane i dopasowywane przez administratora, co pozwala zachować unikalny ton i styl komunikacji firmy.",
                },
              ],
            },
          ],
        },
      ],
      thumbnail: "/projects/andwiert/site-1.png",
    },
  ];

  const [mousePosition] = useMousePosition();

  return (
    <PageContainer section>
      <SectionTitle title={"Projects"}>
        <div className={"flex gap-x-4"}>
          <GroupSection title={"Filter by categories"}>
            <Categories categories={languages} />
          </GroupSection>
          <GroupSection title={"Sort by"}>
            <Selector items={dateSort} render={(item) => item.name} />
          </GroupSection>
        </div>
      </SectionTitle>
      <div className={"relative grid grid-cols-2 basis-full relative"}>
        {projects.map((project, index) => (
          <ProjectPreview
            key={index}
            project={project}
            mousePosition={mousePosition}
          />
        ))}
      </div>
    </PageContainer>
  );
};

const ProjectPreview = ({ project, mousePosition }) => {
  const { theme, opposite } = useSelector((state) => state.theme);

  const containerRef = useRef(null);
  const previewRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getLeftOffset = () =>
    mousePosition.x -
    (containerRef?.current?.getBoundingClientRect()?.left || 0);

  const getTopOffset = () =>
    mousePosition.y -
    (containerRef?.current?.getBoundingClientRect()?.top || 0);
  // const getTopOffset = () =>
  //   mousePosition.y -
  //   (containerRef?.current?.getBoundingClientRect()?.top || 0) -
  //   (previewRef?.current?.getBoundingClientRect()?.height / 2 || 0);

  useEffect(() => {
    const { top, left, width, height } =
      containerRef.current.getBoundingClientRect();

    if (
      !isExpanded &&
      mousePosition.x >= left &&
      mousePosition.x <= left + width &&
      mousePosition.y >= top &&
      mousePosition.y <= top + height
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [mousePosition, containerRef, isExpanded]);

  const [windowCenterPosition, setWindowCenterPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const listener = () => {
      setWindowCenterPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    };

    window.addEventListener("resize", listener);
    window.addEventListener("load", listener);

    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("load", listener);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={"border-t-1 min-h-[20rem] flex items-center relative"}
    >
      <Backdrop isActive={isExpanded} blur />

      <AnimatePresence mode={"wait"}>
        {(isVisible || isExpanded) && (
          <motion.div
            layout
            ref={previewRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                scale: {
                  delay: 0.2,
                },
                opacity: {
                  delay: 0.2,
                },
              },
              x: isExpanded ? null : getLeftOffset(),
              y: isExpanded ? null : getTopOffset(),
            }}
            style={{
              left: isExpanded ? "50%" : 0,
              top: isExpanded ? "50%" : 0,
              width: isExpanded ? `calc(100vw - 20%)` : "32rem",
              height: isExpanded ? `calc(100dvh - 20%)` : "20rem",
              minHeight: isExpanded ? "30rem" : "fit-content",
              position: isExpanded ? "fixed" : "absolute",
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            className={`absolute !z-[1000] rounded-xl border-1 -translate-x-1/2 -translate-y-1/2 overflow-hidden`}
            transition={{
              ...animationsTypes.default,
              duration: animationProperties.durations.long,
            }}
          >
            {/*View that will appear after user click the preview*/}
            <Project
              project={project}
              shouldBeShown={isExpanded}
              onClose={() => setIsExpanded(false)}
            />

            {/*Preview that follows user mouse position*/}
            <MouseAttachedProjectPreview
              shouldBeShown={!isExpanded}
              project={project}
              onClick={() => setIsExpanded(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/*<ExpandingContainer*/}
      {/*  isExpanded={isExpanded}*/}
      {/*  setIsExpanded={setIsExpanded}*/}
      {/*  project={project}*/}
      {/*/>*/}

      <h3 className={"text-4xl select-none"}>{project.title}</h3>
    </motion.div>
  );
};

export default Projects;
