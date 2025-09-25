"use client";
import React, { useState } from "react";
import PageContainer from "@/components/containers/PageContainer";
import SectionTitle from "@/components/containers/SectionTitle";

const AboutMe = () => {
  const [renderDelay, setRenderDelay] = useState<null | number>(null);

  return (
    <PageContainer section>
      <SectionTitle
        title={"About Me"}
        onTitleAnimationComplete={(completeTime) =>
          setRenderDelay(completeTime)
        }
      ></SectionTitle>
    </PageContainer>
  );
};

export default AboutMe;
