"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import { useTranslations } from "next-intl";
import Button from "@/components/buttons/Button";
import Image from "next/image";
import PageContainer from "@/components/PageContainer";
import AnimatedSingleLetterText from "@/components/text/AnimatedSingleLetterText";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import { colors, layoutProperties } from "@/layout";
import TextCarousel from "@/components/text/TextCarousel";
import { useSelector } from "react-redux";

const Hero = () => {
  const t = useTranslations("HomePage");

  const { theme, opposite } = useSelector((state) => state.theme);

  // based on the device's width we choose the correct animation direction
  const [animationDirection, setAnimationDirection] = useState("vertical");

  useEffect(() => {
    setAnimationDirection(window.innerWidth < 1024 ? "horizontal" : "vertical");
  }, []);

  return (
    <PageContainer
      includeNavigationHeight
      className={`flex items-center justify-center ${opposite.background}`}
    >
      <Container
        type={"container"}
        text={"Strategic thinker"}
        animationDirection={animationDirection}
      />

      {/*section of loading animated text*/}
      <motion.div
        className={
          "absolute w-full md:bottom-4 md:left-4 md:right-4 md:inset-none inset-2 flex md:flex-row flex-col justify-between md:items-end z-0"
        }
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          ...animationsTypes.default,
          delay: 1.5,
        }}
      >
        <AnimatedSingleLetterText
          text={"Loading"}
          className={`${layoutProperties.text.large} ${opposite.foreground} select-none`}
        />
        <div className={"mr-4"}>
          <AnimatedSingleLetterText
            text={"Kamil's portfolio"}
            className={`${layoutProperties.text.large} ${opposite.foreground} select-none`}
          />
        </div>
      </motion.div>

      {/*actual hero section*/}
      <div
        className={`flex lg:flex-row flex-col-reverse w-full items-center justify-center lg:gap-0 gap-8 lg:h-3/4 h-full lg:pt-0 pt-[calc(4rem)]`}
      >
        {/*text section*/}
        <div
          className={`relative flex flex-col gap-y-4 basis-1/2 lg:w-1/2 w-full ${theme.foreground}`}
        >
          <div className={`flex flex-col gap-y-2 relative w-full`}>
            <div>
              <div
                className={"relative flex items-center h-fit flex-wrap w-full"}
              >
                <AnimatedSingleLetterText
                  text={"I build"}
                  animationDelay={2.4}
                  className={`${layoutProperties.text.large}`}
                />
                <TextCarousel
                  key={"carousel"}
                  className={`${layoutProperties.text.large}`}
                  words={t("Hero.Header.TextCarousel").split(",")}
                  delay={2.5}
                />
              </div>
              <AnimatedSingleLetterText
                text={"web applications"}
                className={`${layoutProperties.text.large}`}
                animationDelay={2.6}
              />
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
                  delay: 2.6,
                }}
                className={`w-2/3 ${layoutProperties.text.small}`}
              >
                {t("Hero.Summary")}
              </motion.p>
            </div>
          </div>
          <div className={`flex md:flex-row flex-col gap-4 overflow-hidden`}>
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
                delay: 2.7,
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
                delay: 2.7,
              }}
            >
              Hire me
            </Button>
          </div>
        </div>

        <Container
          type={"photoContainer"}
          text={"Agile adaptor"}
          animationDirection={animationDirection}
          className={"basis-1/2"}
        >
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
              sizes={"max-width: 100vw"}
              priority={true}
              style={{
                objectFit: "cover",
                backgroundPosition: "center center",
                filter: "grayscale(1)",
              }}
            />
          </motion.div>
        </Container>
      </div>
    </PageContainer>
  );
};

export default Hero;

const Container = ({
  children,
  text,
  animationDirection,
  type = "photoContainer",
  className = "",
  ...props
}) => {
  const { theme } = useSelector((state) => state.theme);

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
          "h3",
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
          "h3",
          {
            y: type === "photoContainer" ? "-100%" : "100%",
          },
          {
            ...animationsTypes.default,
            duration: 1,
          },
        );

        if (type !== "photoContainer") {
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
              delay: 0.1,
            },
          );
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
              padding: ".25rem",
              width:
                animationDirection === "vertical"
                  ? "calc(50% - 4rem)"
                  : "calc(100% - 2rem)",
              height:
                animationDirection === "vertical"
                  ? "calc(75% - 6rem)"
                  : "calc(50% - 5rem)",
              left: animationDirection === "vertical" ? "50%" : "1rem",
              top: "50%",
              borderRadius: "1rem",
              zIndex: 10,
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            },
            { ...animationsTypes.default, duration: 1, delay: 0.1 },
          );

          await animate(
            scope.current,
            {
              position: "relative",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              aspectRatio: "16 / 9",

              translateY: animationDirection === "vertical" ? 0 : "50%",
              translateX: 0,
              minHeight: "10rem",
            },
            { duration: 0 },
          );

          // for mobile devices, smooth transition to the top section of the hero
          if (animationDirection === "horizontal") {
            await animate(
              scope.current,
              { translateY: 0 },
              {
                ...animationsTypes.default,
                bounce: 0,
                duration: animationProperties.durations.medium,
              },
            );
          }
        }
      }
    };

    if (animationDirection) show();
  }, [animationDirection]);

  return (
    <motion.div
      initial={{
        aspectRatio: 1 / 1,
        origin: type !== "photoContainer" ? "bottom left" : "top left",
        position: "absolute",
        left: type === "photoContainer" ? "50%" : null,
        right: type !== "photoContainer" ? "50%" : null,
        top: "50%",
        translateY: type === "photoContainer" ? "-75%" : "-25%",
        scale: 0.25,
        borderRadius: 0,
      }}
      ref={scope}
      className={`overflow-hidden md:h-1/3 h-1/5 ${
        type !== "photoContainer" ? `${theme.background}` : `bg-purple`
      } ${className}`}
      {...props}
    >
      <div className={"relative h-full w-full"}>
        <VerticallyAppearingText
          text={text}
          direction={type === "photoContainer" ? "fromBottom" : "fromTop"}
          className={`absolute ${
            type === "photoContainer"
              ? "lg:right-2 lg:bottom-2 right-1 bottom-1 text-right"
              : "lg:left-2 lg:top-2 left-1 top-1 text-left"
          } lg:text-3xl md:text-2xl text-xl`}
        />
        {children}
      </div>
    </motion.div>
  );
};
