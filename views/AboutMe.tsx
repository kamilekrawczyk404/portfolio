import React from "react";
import PageContainer from "@/components/containers/PageContainer";
import SectionTitle from "@/components/containers/SectionTitle";

import PersonalInfoCards from "@/views/PersonalInfoCards";
import { useTranslations } from "next-intl";

const AboutMe = () => {
  const t = useTranslations("HomePage.AboutMe");
  return (
    <PageContainer section>
      <SectionTitle
        title={t("Title")}
        description={t("Description")}
        titleContainerClassName={"!sticky !top-[max(15%,6rem)]"}
      >
        <PersonalInfoCards />
      </SectionTitle>
    </PageContainer>
  );
};

export default AboutMe;
