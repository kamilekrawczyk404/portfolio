import React, { useCallback } from "react";
import PageContainer from "@/components/containers/PageContainer";
import SectionTitle from "@/components/containers/SectionTitle";
import ContactForm from "@/components/form/ContactForm";
import GroupSection from "@/components/containers/GroupSection";
import { layoutProperties } from "@/layout";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import StaggeredList from "@/components/lists/StaggeredList";
import { Icons } from "@/components/Icons";
import SocialLinks from "@/views/SocialsLinks";

const Contact = () => {
  return (
    <PageContainer section>
      <SectionTitle title={"Get in touch"} className={"!flex-col !items-start"}>
        <div className={`flex ${layoutProperties.gap.large}`}>
          <div className={"flex flex-col justify-between basis-1/2 h-full"}>
            <h3 className={layoutProperties.text.small}>
              I'm always open to new opportunities, collaborations, or just a
              friendly chat. Whether you have a project in mind, a question
              about my work, or just want to say hello, I'd love to hear from
              you.
            </h3>
            <SocialLinks />
          </div>
          <GroupSection
            title={"Let's connect"}
            headerSize={layoutProperties.text.medium}
            className={`basis-1/2 flex flex-col ${layoutProperties.gap.medium}`}
          >
            <p>
              The quickest way to reach me is by using the form below. I'll do
              my best to get back to you as soon as possible.
            </p>
            <ContactForm className={"basis-1/2"} />
          </GroupSection>
        </div>
      </SectionTitle>
    </PageContainer>
  );
};

export default Contact;
