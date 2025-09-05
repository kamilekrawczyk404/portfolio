import React from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";

type CustomLinkProps = {
  href: string;
  title?: string;
};

const CustomLink = ({ href, title = "" }: CustomLinkProps) => {
  return (
    <div className={"relative group w-full"}>
      <Link href={href} className={"break-all w-full group-hover:underline"}>
        {!title.length ? href : title}
      </Link>
      <Icons.Link
        className={
          "opacity-0 group-hover:opacity-100 ml-[.25rem] mb-[.15rem] text-[.75rem]"
        }
      />
    </div>
  );
};

export default CustomLink;
