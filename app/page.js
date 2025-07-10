import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import ExpandingContainer from "@/components/ExpandingContainer";
import { layoutProperties } from "@/layout";
import Hero from "@/components/Hero";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import { cookies } from "next/headers";

export default async function RootPage() {
  const cookiesStore = await cookies();

  const themeModeCookieName = "theme-mode";
  let themeMode = null;

  if (cookiesStore.has(themeModeCookieName)) {
    themeMode = cookiesStore.get(themeModeCookieName);
  }
  // else {
  //   // get user preferred them mode
  //   themeMode = window.matchMedia("prefers-color-scheme");
  //
  //   const date = new Date();
  //
  //   cookiesStore.set({
  //     name: themeModeCookieName,
  //     value: themeMode,
  //     path: "/",
  //     expires: date.setDate(date.getDate() + 7),
  //   });
  // }

  const t = getTranslations("HomePage");

  return (
    <div className={`flex flex-col relative bg-transparent`}>
      <Hero />
      <Technologies />
      <Projects />
    </div>
  );
}
