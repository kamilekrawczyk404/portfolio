"use client";
import React from "react";
import { motion } from "framer-motion";
import { animationProperties } from "@/animations";

const AppearingContainer = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: animationProperties.durations.long }}
    >
      {children}
    </motion.div>
  );
};

export default AppearingContainer;
