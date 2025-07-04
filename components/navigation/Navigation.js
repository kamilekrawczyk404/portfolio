"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "@/components/Backdrop";
import Button from "@/components/buttons/Button";
import NavigationLink from "@/components/buttons/NavigationLink";
import { Icons } from "@/components/Icons";
import { useTranslations } from "next-intl";
import { animationProperties, animationsTypes } from "@/animations";
import LanguagesButtons from "@/components/navigation/LanguagesButtons";
import { colors, layoutProperties } from "@/layout";
import { changeTheme } from "@/redux/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigationLoaded, setIsNavigationLoaded] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const linksContainerRef = useRef(null);
  const menuButtonRef = useRef(null);

  const animationDuration = animationProperties.durations.short + 1;

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

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setIsNavigationLoaded(true);
        dispatch(changeTheme());
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
      className={`fixed top-0 left-0 w-full flex h-[4rem] items-center justify-between gap-4 z-[1000] backdrop-blur-sm shadow-sm ${layoutProperties.padding} ${theme.foreground}`}
    >
      <AnimatePresence mode={"wait"}>
        {isMenuOpen && (
          <>
            <Backdrop isActive={isMenuOpen} />
            <motion.aside
              ref={linksContainerRef}
              className={`fixed h-screen w-2/5 top-0 rounded-r-3xl flex flex-col z-[100] gap-4 ${layoutProperties.padding} ${theme.background} ${theme.foreground}`}
              initial={{ left: "-50%", pointerEvents: "none" }}
              animate={{ left: 0, pointerEvents: "auto" }}
              exit={{ left: "-50%", pointerEvents: "none" }}
              transition={animationsTypes.default}
            >
              <div className={`h-[4rem] flex items-center`}>
                <Button onClick={() => setIsMenuOpen(false)} square navigation>
                  <Icons.Close
                    className={
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    }
                  />
                </Button>
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
              <div className={"flex gap-2 h-[4rem] items-center"}>
                <LanguagesButtons />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <Button
        ref={menuButtonRef}
        navigation
        onClick={() => setIsMenuOpen(true)}
      >
        Menu
      </Button>
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
          className={"overflow-hidden relative"}
        >
          <Button navigation className={"text-nowrap"}>
            {t("download-cv")}
          </Button>
        </motion.div>
      </div>
      <div className={"flex gap-x-1"}>
        <LanguagesButtons />
      </div>
    </motion.nav>
  );
};

export default Navigation;
