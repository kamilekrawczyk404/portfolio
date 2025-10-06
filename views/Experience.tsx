import React from "react";
import PageContainer from "@/components/containers/PageContainer";
import SectionTitle from "@/components/containers/SectionTitle";
import { useTranslations } from "next-intl";
import ExperienceTimeline from "@/views/ExperienceTimeline";

type ExperienceProps = {
  locale: string;
};

const Experience = ({ locale }: ExperienceProps) => {
  const t = useTranslations("HomePage.Experience");

  return (
    <PageContainer section>
      <SectionTitle
        title={t("Title")}
        description={t("Description")}
        titleContainerClassName={"!sticky !top-[max(15%,8rem)]"}
      >
        <ExperienceTimeline locale={locale} />
      </SectionTitle>
    </PageContainer>
  );
};

export default Experience;
