import React from "react";
import PageContainer from "@/components/containers/PageContainer";
import { layoutProperties } from "@/layout";
import SocialLinks from "@/views/SocialsLinks";
import Sitemap from "@/components/navigation/Sitemap";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("HomePage.Footer");
  return (
    <PageContainer
      className={`flex md:flex-row flex-col-reverse ${layoutProperties.gap.medium}`}
      screenHeight={false}
    >
      <div
        className={`basis-fit flex flex-col md:self-end self-start ${layoutProperties.gap.extraSmall}`}
      >
        <span
          className={`${layoutProperties.text.extraSmall} text-gray-500 text-nowrap`}
        >
          © Kamil Krawczyk {new Date().getFullYear()} ─ {t("Rights")}
        </span>
      </div>
      <div
        className={`basis-full flex md:flex-row flex-col ${layoutProperties.gap.small} md:justify-end justify-start`}
      >
        <Sitemap />
        <SocialLinks />
      </div>
    </PageContainer>
  );
};

export default Footer;
