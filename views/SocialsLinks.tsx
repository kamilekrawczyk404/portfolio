"use client";
import React, { ReactNode, useCallback } from "react";
import { Icons } from "@/components/Icons";
import GroupSection from "@/components/containers/GroupSection";
import { layoutProperties } from "@/layout";
import StaggeredList from "@/components/lists/StaggeredList";
import { useTranslations } from "next-intl";

type SocialLink = {
  name: string;
  url: string;
  icon: ReactNode;
};

const socialLinks: SocialLink[] = [
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

const SocialLinks = () => {
  const t = useTranslations("HomePage.Footer");

  const renderSocialLinks = useCallback((item) => {
    return (
      <a href={item.url}>
        <span className={`md:text-2xl text-xl text-gray-500`}>{item.icon}</span>
      </a>
    );
  }, []);

  return (
    <GroupSection
      className={`basis-fit ${layoutProperties.gap.extraSmall}`}
      title={() => <span>{t("Socials")}</span>}
    >
      <StaggeredList
        className={`flex gap-4`}
        items={socialLinks}
        render={renderSocialLinks}
      />
    </GroupSection>
  );
};

export default SocialLinks;
