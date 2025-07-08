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

const Projects = () => {
  const languages = [
    { name: "Javascript" },
    { name: "PHP" },
    { name: "C#" },
    { name: "C++" },
    { name: "Python" },
    { name: "Java" },
  ];

  const dateSort = [
    { name: "Newest" },
    { name: "Oldest" },
    { name: "Title ascending" },
    { name: "Title descending" },
  ];

  const projects = [
    {
      title: "Strona dla firmy And-Wiert",
      description: [
        { title: "Galeria zdjęć" },
        {
          title: "Stack technologiczny",
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
              aspects: ["NextAuth", "Prisma", "Sitemap", "Sharp"],
            },
            {
              title: "Database",
              aspects: ["MySQL"],
            },
            {
              title: "Deployment & Hosting",
              aspects: ["Docker", "OVH"],
            },
          ],
        },
        {
          title: "Główne funkcjonalności",
          categories: [
            {
              title:
                "Projekt And-Wiert.pl oferuje szereg kluczowych funkcjonalności, które wspierają zarówno użytkowników końcowych, jak i administratorów.",
              aspects: [
                {
                  name: "Prezentacja Usług",
                  description:
                    "Szczegółowy opis oferowanych usług, takich jak wiercenie studni, montaż rur, dobór pomp, czyszczenie i konserwacja, oraz wykonanie przyłączy wodnych. Każda usługa jest jasno przedstawiona, aby potencjalny klient mógł szybko zrozumieć zakres działalności firmy.",
                },
                {
                  name: "Sekcja Kontaktowa",
                  description:
                    "Intuicyjny formularz kontaktowy oraz widoczne dane teleadresowe, ułatwiające szybkie nawiązanie kontaktu i zapytanie o ofertę.",
                },
                {
                  name: "Dynamiczny Blog/Artykuły",
                  description:
                    "Sekcja z artykułami eksperckimi na temat studni głębinowych, wyboru lokalizacji, aspektów prawnych i środowiskowych. Ta część pełni funkcję edukacyjną i buduje autorytet firmy w branży.",
                },
                {
                  name: "Responsywny Design",
                  description:
                    "Strona jest w pełni responsywna, co zapewnia optymalne wyświetlanie i użyteczność na różnych urządzeniach – od komputerów stacjonarnych po tablety i smartfony.",
                },
              ],
            },
          ],
        },
      ],
      thumbnail: "/projects/andwiert/1.png",
    },
  ];

  const [mousePosition] = useMousePosition();

  return (
    <PageContainer includeNavigationHeight section>
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
  const { theme } = useSelector((state) => state.theme);

  const containerRef = useRef(null);
  const previewRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
  }, [mousePosition, containerRef, previewRef, isExpanded]);

  return (
    <motion.div
      ref={containerRef}
      className={"border-t-1 min-h-[rem] flex items-center relative"}
    >
      <Backdrop isActive={isExpanded} blur />

      <AnimatePresence mode={"wait"}>
        {isVisible && (
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
              x: !isExpanded
                ? (containerRef.current
                    ? mousePosition.x -
                      containerRef.current.getBoundingClientRect().left
                    : 0) - (previewRef.current?.clientWidth / 2 || 0)
                : null,
              y: !isExpanded
                ? (containerRef.current
                    ? mousePosition.y -
                      containerRef.current.getBoundingClientRect().top
                    : 0) -
                  (previewRef.current?.clientHeight / 2 || 0) -
                  64
                : null,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={"!z-[100] rounded-xl border-1 p-2 w-1/2 h-2/3 absolute"}
            transition={animationsTypes.default}
          >
            <div
              style={{
                backgroundImage: `url(${project.thumbnail})`,
              }}
              className={"rounded-lg bg-no-repeat bg-cover w-full h-full"}
            ></div>
            {!isExpanded && (
              <motion.div
                className={
                  "absolute cursor-pointer select-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center aspect-square h-2/5 rounded-xl bg-orange !z-[1000]"
                }
                onClick={() => setIsExpanded(true)}
              >
                View
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ExpandingContainer
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        project={project}
      />

      <h3 className={"text-4xl select-none"}>{project.title}</h3>
    </motion.div>
  );
};

export default Projects;
