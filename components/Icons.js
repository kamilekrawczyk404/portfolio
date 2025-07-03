import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";

export const Icons = {
  Close: ({ className = "" }) => (
    <FontAwesomeIcon icon={faClose} className={className} />
  ),
  Arrow: ({ className = "" }) => (
    <FontAwesomeIcon icon={faArrowRight} className={className} />
  ),
};
