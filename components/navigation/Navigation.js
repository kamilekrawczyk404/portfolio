"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "@/components/Backdrop";
import Button from "@/components/buttons/Button";
import NavigationLink from "@/components/buttons/NavigationLink";
import { Icons } from "@/components/Icons";
import { useTranslations } from "next-intl";
import { animationProperties, animationsTypes } from "@/animations";
import LanguagesButtons from "@/components/navigation/LanguagesButtons";
import { layoutProperties } from "@/layout";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigationLoaded, setIsNavigationLoaded] = useState(false);

  const animationDuration = animationProperties.durations.short;

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setIsNavigationLoaded(true);
      },
      animationDuration * 1000 + 500,
    );

    return () => clearTimeout(timeout);
  }, []);

  const t = useTranslations("Navigation");

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        // duration: animationProperties.durations.short,
        opacity: {
          duration: animationDuration,
          delay: animationDuration,
        },
        ...animationsTypes.default,
      }}
      className={`fixed top-0 left-0 w-full flex bg-blur h-[4rem] items-center justify-between gap-4 ${layoutProperties.padding}`}
    >
      <AnimatePresence mode={"wait"}>
        {isMenuOpen && (
          <>
            <Backdrop isActive={isMenuOpen} />
            <motion.aside
              className={
                "fixed h-full bg-gray-100 w-2/5 top-0 p-4 rounded-r-3xl flex flex-col z-[100] gap-4"
              }
              initial={{ left: "-50%", pointerEvents: "none" }}
              animate={{ left: 0, pointerEvents: "auto" }}
              exit={{ left: "-50%", pointerEvents: "none" }}
              transition={animationsTypes.default}
            >
              <Button onClick={() => setIsMenuOpen(false)} square>
                <Icons.Close
                  className={
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  }
                />
              </Button>
              <div className={"flex flex-col flex-1 justify-center"}>
                {links.map((link) => (
                  <NavigationLink key={link.name} href={link.href}>
                    {t(`links.${link.name.toLowerCase()}`)}
                  </NavigationLink>
                ))}
              </div>
              <div className={"flex gap-2"}>
                <LanguagesButtons />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <div className={"flex items-center gap-x-1"}>
        <Button onClick={() => setIsMenuOpen(true)}>Menu</Button>
        <Button
          initial={{ opacity: 0 }}
          animate={isNavigationLoaded ? { opacity: 1 } : {}}
        >
          {t("download-cv")}
        </Button>
      </div>
      <div
        className={
          "absolute left-1/2 -translate-x-1/2 flex-1 top-1/2 -translate-y-1/2 flex items-center gap-2 justify-center"
        }
      >
        <span>Kamil Krawczyk</span>
        <motion.div
          initial={{ width: 0 }}
          animate={
            isNavigationLoaded
              ? {
                  width: "auto",
                }
              : {}
          }
          className={
            "overflow-hidden relative bg-purple rounded-md text-gray-100 h-8 flex items-center"
          }
        >
          <span className={"text-nowrap mx-2"}>Web developer</span>
        </motion.div>
      </div>
      <div className={"flex gap-x-1"}>
        <LanguagesButtons />
      </div>
    </motion.nav>
  );
};

export default Navigation;
