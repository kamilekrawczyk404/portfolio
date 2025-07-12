"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "@/components/Backdrop";
import Button from "@/components/buttons/Button";
import NavigationLink from "@/components/buttons/NavigationLink";
import { useTranslations } from "next-intl";
import { animationProperties, animationsTypes } from "@/animations";
import LanguagesButtons from "@/components/navigation/LanguagesButtons";
import { layoutProperties } from "@/layout";
import { changeTheme } from "@/redux/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseButton from "@/components/buttons/CloseButton";
import { Icons } from "@/components/Icons";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const Navigation = () => {
  const { theme, selected } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const t = useTranslations("Navigation");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigationLoaded, setIsNavigationLoaded] = useState(false);

  const linksContainerRef = useRef(null);
  const menuButtonRef = useRef(null);

  const animationDuration = animationProperties.durations.short + 1;

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

  useEffect(() => {
    // if (selected === 'dark')

    const timeout = setTimeout(
      () => {
        setIsNavigationLoaded(true);
        // dispatch(changeTheme());
      },
      animationDuration * 1000 + 750,
    );

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const listener = (e) => {
      if (
        isMenuOpen &&
        linksContainerRef.current &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target) &&
        !linksContainerRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("click", listener);

    return () => window.removeEventListener("click", listener);
  }, [isMenuOpen, linksContainerRef, menuButtonRef]);

  useEffect(() => {
    if (!hasCookie("theme-mode")) {
      if (window) {
        const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";

        setCookie("theme-mode", preferredTheme);
        dispatch(changeTheme(preferredTheme));
      }
    } else {
      dispatch(changeTheme(getCookie("theme-mode")));
    }
  }, []);

  return (
    <motion.nav
      initial={{
        y: "-100%",
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        opacity: {
          duration: 0.5,
          delay: 0.2,
        },
        ...animationsTypes.default,
        delay: 0.1,
      }}
      className={`fixed top-0 left-0 w-full flex h-[4rem] items-center justify-between gap-4 z-[100] border-b-1 backdrop-blur-sm shadow-sm ${layoutProperties.padding} ${theme.foreground} ${theme.background}`}
    >
      <AnimatePresence mode={"wait"}>
        {isMenuOpen && (
          <>
            <Backdrop isActive={isMenuOpen} />
            <motion.aside
              ref={linksContainerRef}
              className={`fixed h-screen lg:w-2/5 w-4/5 top-0 rounded-r-3xl flex flex-col z-[1000] gap-4 ${layoutProperties.padding} ${theme.background} ${theme.foreground}`}
              initial={{ left: "-100%", pointerEvents: "none" }}
              animate={{ left: 0, pointerEvents: "auto" }}
              exit={{ left: "-100%", pointerEvents: "none" }}
              transition={{
                ...animationsTypes.default,
                duration: animationProperties.durations.long,
              }}
            >
              <div
                className={`h-[4rem] flex items-center justify-between w-full`}
              >
                <CloseButton onClick={() => setIsMenuOpen(false)} />
                <ThemeSwitcher />
              </div>

              <div
                className={`flex flex-col flex-1 gap-y-2 justify-center ${layoutProperties.body.padding}`}
              >
                {links.map((link) => (
                  <NavigationLink key={link.name} href={link.href}>
                    {t(`links.${link.name.toLowerCase()}`)}
                  </NavigationLink>
                ))}
              </div>
              <div
                className={
                  "relative flex h-[4rem] items-center w-full justify-between"
                }
              >
                <div className={"flex gap-2 items-center"}>
                  <LanguagesButtons />
                </div>
                <DownloadCvButton t={t} className={"md:hidden block"} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className={"flex justify-between items-center sm:w-fit w-full"}>
        <Button
          ref={menuButtonRef}
          navigation
          onClick={() => setIsMenuOpen(true)}
        >
          Menu
        </Button>
      </div>

      <div
        className={
          "absolute left-1/2 -translate-x-1/2 flex-1 top-1/2 -translate-y-1/2  flex items-center gap-2 sm:justify-center justify-end flex-row"
        }
      >
        <motion.div
          initial={{ width: 0 }}
          animate={
            isNavigationLoaded
              ? {
                  width: "auto",
                }
              : {}
          }
          className={"overflow-hidden relative flex gap-x-2 items-center"}
        >
          <p>Kamil Krawczyk</p>
          <DownloadCvButton t={t} className={"md:block hidden"} />
        </motion.div>
      </div>
      <div className={`flex items-center gap-x-1`}>
        <LanguagesButtons />
      </div>
    </motion.nav>
  );
};

export default Navigation;

const DownloadCvButton = ({ t, className = "" }) => (
  <Button navigation className={`text-nowrap ${className}`}>
    {t("download-cv")}
  </Button>
);
