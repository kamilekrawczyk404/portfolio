import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import ExpandingContainer from "@/components/ExpandingContainer";
import { layoutProperties } from "@/layout";
import Hero from "@/components/Hero";

export default function RootPage() {
  const t = useTranslations("HomePage");
  return (
    <div
      className={`mt-[4rem] flex h-[calc(100dvh-5rem)] relative bg-transparent ${layoutProperties.margin}`}
    >
      <Hero />
    </div>
  );
}
