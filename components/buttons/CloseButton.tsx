import React from "react";
import { Icons } from "@/components/Icons";
import Button, { ButtonProps } from "@/components/buttons/Button";

type CloseButtonProps = ButtonProps & { dataTestId?: string };
const CloseButton = ({ dataTestId, ...props }: CloseButtonProps) => {
  return (
    <Button dataTestId={dataTestId} square navigation {...props}>
      <Icons.Close
        className={
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        }
      />
    </Button>
  );
};

export default CloseButton;
