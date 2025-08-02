"use client";
import React, { useCallback } from "react";
import { Icons } from "@/components/Icons";
import GroupSection from "@/components/containers/GroupSection";
import { layoutProperties } from "@/layout";
import StaggeredList from "@/components/lists/StaggeredList";

const SocialLinks = () => {
  const socialLinks = [
    {
      name: "Github",
      url: "https://github.com/kamilekrawczyk404",
      icon: <Icons.GitHub />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kamil-krawczyk-902850375/",
      icon: <Icons.Linkedin />,
    },
  ];

  const renderSocialLinks = useCallback((item) => {
    return (
      <a href={item.url}>
        <span className={`text-3xl`}>{item.icon}</span>
      </a>
    );
  }, []);

  return (
    <GroupSection
      className={`basis-fit ${layoutProperties.gap.medium}`}
      title={"Essential links"}
      headerSize={layoutProperties.text.medium}
    >
      <StaggeredList
        className={`flex ${layoutProperties.gap.small}`}
        items={socialLinks}
        render={renderSocialLinks}
      />
    </GroupSection>
  );
};

export default SocialLinks;
