"use client";
import React from "react";
import { layoutProperties } from "@/layout";
import StaggeredList from "@/components/lists/StaggeredList";
import GroupSection from "@/components/containers/GroupSection";
import Link from "next/link";
import { useTranslations } from "next-intl";

const siteMap = [
  { href: "#start" },
  { href: "#technologies" },
  { href: "#projects" },
  { href: "#contact" },
];

const Sitemap = () => {
  const t = useTranslations("HomePage.Footer.Sitemap");

  return (
    <GroupSection title={t("Title")} headerSize={layoutProperties.text.small}>
      <StaggeredList
        items={siteMap}
        render={(link) => (
          <Link
            className={`${layoutProperties.text.extraSmall} text-gray-500`}
            href={link.href}
          >
            {t(`Links.${link.href.substring(1)}`)}
          </Link>
        )}
      />
    </GroupSection>
  );
};

export default Sitemap;
