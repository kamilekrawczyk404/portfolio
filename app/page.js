import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import ExpandingContainer from "@/components/ExpandingContainer";
import { layoutProperties } from "@/layout";
import Hero from "@/components/Hero";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";

export default function RootPage() {
  const t = useTranslations("HomePage");
  return (
    <div className={`flex flex-col relative bg-transparent`}>
      <Hero />
      <Technologies />
      <Projects />
    </div>
  );
}
