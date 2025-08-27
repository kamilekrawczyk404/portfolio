import React, { useCallback } from "react";
import PageContainer from "@/components/containers/PageContainer";
import SectionTitle from "@/components/containers/SectionTitle";
import ContactForm from "@/components/form/ContactForm";
import { layoutProperties } from "@/layout";
import AppearingContainer from "@/components/containers/AppearingContainer";
import { useTranslations } from "next-intl";
import { Icons } from "@/components/Icons";

const contactOptions = [
  {
    icon: <Icons.Envelope />,
    title: "Email",
    value: "kamilekkrawczyk404@gmail.com",
    type: "email",
  },
  {
    icon: <Icons.Phone />,
    title: "Phone",
    value: "+48 698 536 476",
    type: "phone",
  },
];

const Contact = () => {
  const t = useTranslations("HomePage.Contact");
  return (
    <PageContainer section id={"contact"}>
      <SectionTitle title={t("Title")} className={"!flex-col !items-start"}>
        <AppearingContainer
          className={`flex ${layoutProperties.gap.large} md:flex-row flex-col`}
        >
          <div
            className={`basis-1/2 flex flex-col ${layoutProperties.gap.medium}`}
          >
            <ContactForm className={"basis-1/2"} />
          </div>
          <div
            className={`flex flex-col justify-between basis-1/2 h-full ${layoutProperties.gap.large}`}
          >
            <p className={layoutProperties.text.small}>{t("Description")}</p>
            <div
              className={`flex md:flex-row flex-col ${layoutProperties.gap.medium}`}
            >
              {contactOptions.map(({ icon, title, value, type }, index) => (
                <ContactOption
                  key={index}
                  title={title}
                  icon={icon}
                  type={type}
                  value={value}
                />
              ))}
            </div>
          </div>
        </AppearingContainer>
      </SectionTitle>
    </PageContainer>
  );
};

const ContactOption = ({ icon, title, value, type }) => {
  return (
    <div className={`flex ${layoutProperties.gap.small} items-center w-full`}>
      <div className={`md:text-xl text-lg`}>{icon}</div>
      <div className={`flex flex-col ${layoutProperties.gap.extraSmall}`}>
        <span className={`text-gray-500 ${layoutProperties.text.small}`}>
          {title}
        </span>
        <a
          href={
            type === "email"
              ? `mailto:${value}`
              : `tel:${value.replaceAll(" ", "")}`
          }
          className={`${layoutProperties.text.extraSmall}`}
        >
          {value}
        </a>
      </div>
    </div>
  );
};

export default Contact;
