import React from "react";
import PageContainer from "@/components/containers/PageContainer";
import SectionTitle from "@/components/containers/SectionTitle";

import PersonalInfoCards from "@/views/PersonalInfoCards";
import { useTranslations } from "next-intl";

const AboutMe = () => {
  const t = useTranslations("HomePage.AboutMe");
  return (
    <PageContainer centerItems className={"flex items-center justify-center"}>
      <SectionTitle title={t("Title")} description={t("Description")}>
        <PersonalInfoCards />
      </SectionTitle>
    </PageContainer>
  );
};

export default AboutMe;
