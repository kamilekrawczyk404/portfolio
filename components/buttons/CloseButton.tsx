import React, { ComponentProps, ReactElement } from "react";
import { Icons } from "@/components/Icons";
import Button, { ButtonProps } from "@/components/buttons/Button";

const CloseButton = ({ ...props }: ButtonProps) => {
  return (
    <Button square navigation {...props}>
      <Icons.Close
        className={
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        }
      />
    </Button>
  );
};

export default CloseButton;
