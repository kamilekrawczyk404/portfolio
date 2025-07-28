import React from "react";
import PageContainer from "@/components/containers/PageContainer";
import SectionTitle from "@/components/containers/SectionTitle";
import ContactForm from "@/components/form/ContactForm";
import GroupSection from "@/components/containers/GroupSection";

const Contact = () => {
  return (
    <PageContainer section>
      <SectionTitle title={"Contact"} />
      <div className={"flex"}>
        <div className={"basis-1/2"}></div>
        <ContactForm className={"basis-1/2"} />
      </div>
    </PageContainer>
  );
};

export default Contact;
