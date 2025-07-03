"use client";
import React, { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";

const Hero = () => {
  return (
    <>
      <Container as={"background"} text={"Strategic thinker"} />
      <Container text={"Agile adaptor"} />
    </>
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
            delay: 0.1,
            duration: 1,
            type: "spring",
          },
        );

        if (as !== "gallery") {
          await animate(
            scope.current,
            {
              width: "50%",
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
              scale: 2.5,
            },
            {
              ...animationsTypes.default,
              duration: 1,
              delay: 0.2,
            },
          );
        } else {
          await animate(
            scope.current,
            {
              width: "50%",
              height: "100%",
              borderRadius: "1rem",
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
        left: as === "gallery" ? "50%" : "25%",
        top: "50%",
        translateY: as === "gallery" ? "-75%" : "-25%",
        scale: 0.25,
        borderRadius: 0,
        // origin: as !== "gallery" ? "bottom right" : "top left",
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
      {children}
    </motion.div>
  );
};
