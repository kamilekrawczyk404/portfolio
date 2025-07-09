import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faArrowRight,
  faCaretDown,
  faClose,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

export const Icons = {
  Close: ({ className = "" }) => (
    <FontAwesomeIcon icon={faClose} className={className} />
  ),
  Arrow: ({ className = "" }) => (
    <FontAwesomeIcon icon={faArrowRight} className={className} />
  ),
  CaretDown: ({ className = "" }) => (
    <FontAwesomeIcon icon={faCaretDown} className={className} />
  ),
  AngleRight: ({ className = "" }) => (
    <FontAwesomeIcon icon={faAngleRight} className={className} />
  ),
  AngleLeft: ({ className = "" }) => (
    <FontAwesomeIcon icon={faAngleLeft} className={className} />
  ),
  Sun: ({ className = "" }) => (
    <FontAwesomeIcon icon={faSun} className={className} />
  ),
  Moon: ({ className = "" }) => (
    <FontAwesomeIcon icon={faMoon} className={className} />
  ),
};
