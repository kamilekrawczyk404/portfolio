"use client";

import React, { JSX, useEffect, useState } from "react";
import Button from "@/components/buttons/Button";
import { routing } from "@/i18n/routing";
import { useRouter } from "next/navigation";

const LanguagesButtons = (): JSX.Element[] => {
  const [locale, setLocale] = useState("");
  const router = useRouter();

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);

    document.cookie = `portfolio_locale=${newLocale};`;

    router.refresh();
  };

  useEffect(() => {
    const cookieLocale = document.cookie
      .split(";")
      .find((row) => row.startsWith("portfolio_locale"))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      setLocale("en");
      document.cookie = `portfolio_locale=${routing.defaultLocale}`;
      router.refresh();
    }
  }, [router]);

  return routing.locales.map((language) => (
    <Button
      key={language}
      square
      navigation
      filled={locale === language}
      onClick={() => changeLocale(language)}
    >
      <span
        className={
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }
      >
        {language.toUpperCase()}
      </span>
    </Button>
  ));
};

export default LanguagesButtons;
