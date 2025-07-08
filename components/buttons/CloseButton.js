import React from "react";
import { Icons } from "@/components/Icons";
import Button from "@/components/buttons/Button";

const CloseButton = ({ ...props }) => {
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
