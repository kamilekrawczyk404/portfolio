import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import ExpandingContainer from "@/components/ExpandingContainer";
import { layoutProperties } from "@/layout";
import Hero from "@/components/Hero";

export default function RootPage() {
  const t = useTranslations("HomePage");
  return (
    <div className={`flex flex-col relative bg-transparent`}>
      <Hero />
      <div className={"h-screen w-full bg-red-500"} />
    </div>
  );
}
