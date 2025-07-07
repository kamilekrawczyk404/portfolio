"use client";
import React, { useState } from "react";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { animationsTypes } from "@/animations";
import { colors } from "@/layout";
import UnderlineNav from "@/components/UnderlineNav";
import GroupSection from "@/components/GroupSection";
import Categories from "@/components/Categories";

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
    { name: "Newest", order: "desc" },
    { name: "Oldest", order: "asc" },
  ];

  return (
    <PageContainer includeNavigationHeight section>
      <SectionTitle title={"Projects"}>
        <div className={"flex gap-x-4"}>
          <GroupSection title={"Filter by categories"}>
            <Categories categories={languages} />
          </GroupSection>
          <GroupSection title={"Sort by date"}>
            <UnderlineNav
              id={"sortProjectsByDate"}
              items={dateSort}
              render={(item) => item.name}
            />
          </GroupSection>
        </div>
      </SectionTitle>
      <div className={""}></div>
    </PageContainer>
  );
};

export default Projects;
