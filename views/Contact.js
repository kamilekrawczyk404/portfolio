import React, { useCallback } from "react";
import PageContainer from "@/components/containers/PageContainer";
import SectionTitle from "@/components/containers/SectionTitle";
import ContactForm from "@/components/form/ContactForm";
import GroupSection from "@/components/containers/GroupSection";
import { layoutProperties } from "@/layout";
import SocialLinks from "@/views/SocialsLinks";
import AppearingContainer from "@/components/containers/AppearingContainer";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("HomePage.Contact");
  return (
    <PageContainer section>
      <SectionTitle title={t("Title")} className={"!flex-col !items-start"}>
        <AppearingContainer
          className={`flex ${layoutProperties.gap.large} md:flex-row flex-col`}
        >
          <div
            className={`flex flex-col justify-between basis-1/2 h-full ${layoutProperties.gap.large}`}
          >
            <p className={layoutProperties.text.small}>{t("Description")}</p>
            <SocialLinks />
          </div>
          <GroupSection
            title={t("Form.Title")}
            headerSize={layoutProperties.text.medium}
            className={`basis-1/2 flex flex-col ${layoutProperties.gap.medium}`}
          >
            <ContactForm className={"basis-1/2"} />
          </GroupSection>
        </AppearingContainer>
      </SectionTitle>
    </PageContainer>
  );
};

export default Contact;
