"use client";
import React, { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { animationsTypes } from "@/animations";
import { useTranslations } from "next-intl";
import Button from "@/components/buttons/Button";
import AnimatedText from "@/components/AnimatedText";
import TextCarousel from "@/components/TextCarousel";
import Image from "next/image";
import PageContainer from "@/components/PageContainer";

const Hero = () => {
  const t = useTranslations("HomePage");

  return (
    <PageContainer includeNavigationHeight>
      <Container as={"background"} text={"Strategic thinker"} />
      <Container text={"Agile adaptor"}>
        <motion.div
          initial={{
            opacity: 0,
            borderRadius: 0,
          }}
          className={`w-full h-full relative overflow-hidden`}
        >
          <Image
            src={"/hero/myself_3.webp"}
            alt={"Myself"}
            fill
            style={{
              objectFit: "cover",
              backgroundPosition: "center center",
              filter: "grayscale(1)",
            }}
          />
        </motion.div>
      </Container>
      <motion.div
        className={
          "absolute bottom-4 left-4 right-4 flex justify-between -z-10"
        }
      >
        <AnimatedText text={"Loading"} className={"text-7xl text-gray-100"} />
        <div>
          <AnimatedText
            text={"Kamil's portfolio"}
            className={"text-7xl text-gray-100"}
          />
        </div>
      </motion.div>

      <div
        className={`absolute top-1/2 -translate-y-1/2 flex flex-col mx-auto gap-y-8 w-[calc(50%-1rem)]`}
      >
        <div className={"flex flex-col gap-y-2"}>
          <div>
            <div className={"relative flex items-center h-fit flex-wrap"}>
              <AnimatedText
                text={"I build"}
                animationDelay={2}
                className={"text-7xl"}
              ></AnimatedText>
              <TextCarousel
                key={"carousel"}
                className={"text-7xl"}
                words={t("Hero.Header.TextCarousel").split(",")}
                delay={2.2}
              />
            </div>
            <div>
              <AnimatedText
                text={"web applications"}
                className={"text-7xl"}
                animationDelay={2.3}
              />
            </div>
          </div>
          <div className={"overflow-hidden"}>
            <motion.p
              initial={{
                opacity: 0,
                y: "50%",
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                ...animationsTypes.default,
                delay: 2.3,
              }}
              className={"text-lg w-2/3"}
            >
              {t("Hero.Summary")}
            </motion.p>
          </div>
        </div>
        <div className={"flex gap-x-4 overflow-hidden"}>
          <Button
            initial={{
              opacity: 0,
              y: "100%",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              ...animationsTypes.default,
              delay: 2.4,
            }}
            main
          >
            Explore my works
          </Button>
          <Button
            filled
            main
            initial={{
              opacity: 0,
              y: "100%",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              ...animationsTypes.default,
              delay: 2.4,
            }}
          >
            Hire me
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Hero;

const Container = ({ children, text, as = "gallery", className = "" }) => {
  // if this component is not as a gallery, it would be animated to cover entire screen
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const show = async () => {
      {
        animate(
          scope.current,
          {
            translateY: "-50%",
            scale: 1,
          },
          { ...animationsTypes.default, duration: 1 },
        );

        await animate(
          "span",
          {
            y: 0,
          },
          {
            ...animationsTypes.default,

            delay: 0.3,
            duration: 1,
          },
        );

        animate(
          "span",
          {
            y: as === "gallery" ? "100%" : "-100%",
          },
          {
            ...animationsTypes.default,
            duration: 1,
            type: "spring",
          },
        );

        if (as !== "gallery") {
          await animate(
            scope.current,
            {
              width: scope.current.getBoundingClientRect().height * 2,
              right: null,
              left: "50%",
              translateX: "-50%",
            },
            { duration: 0 },
          );
          await animate(
            scope.current,
            {
              origin: "center center",
            },
            { duration: 0 },
          );

          await animate(
            scope.current,
            {
              translateX: "-50%",
              translateY: "-50%",
            },
            {
              duration: 0,
            },
          );
          await animate(
            scope.current,
            {
              width: "100vw",
              height: "100%",
            },
            {
              ...animationsTypes.default,
              duration: 1,
              delay: 0.2,
            },
          );

          // document.body.classList.replace(
          //   colors.dark.background,
          //   colors.light.background,
          // );
        } else {
          animate("div", {
            opacity: 1,
          });
          animate(
            "div",
            {
              borderRadius: ".9rem",
            },
            { delay: 0.3 },
          );
          await animate(
            scope.current,
            {
              width: "calc(50% - 4rem)",
              height: "60%",
              borderRadius: "1rem",
              zIndex: 100,
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            },
            { ...animationsTypes.default, duration: 1, delay: 0.2 },
          );
        }
      }
    };

    show();
  }, []);

  return (
    <motion.div
      initial={{
        aspectRatio: "1 / 1",
        position: "absolute",
        left: as === "gallery" ? "50%" : null,
        right: as !== "gallery" ? "50%" : null,
        top: "50%",
        translateY: as === "gallery" ? "-75%" : "-25%",
        scale: 0.25,
        borderRadius: 0,
      }}
      ref={scope}
      className={`overflow-hidden h-1/2 ${
        as !== "gallery"
          ? "origin-bottom-right bg-gray-100"
          : "origin-top-left bg-purple"
      } ${className}`}
    >
      <div
        className={`absolute text-3xl overflow-hidden ${
          as === "gallery" ? "bottom-2 right-2" : "top-2 left-2"
        }`}
      >
        <motion.span
          className={"inline-block"}
          initial={{ y: as === "gallery" ? "-100%" : "100%" }}
        >
          {text}
        </motion.span>
      </div>
      <div className={"p-1 h-full w-full"}>{children}</div>
    </motion.div>
  );
};
