import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faAngleLeft,
  faAngleRight,
  faArrowRight,
  faArrowUpRightFromSquare,
  faCaretDown,
  faClockRotateLeft,
  faClose,
  faCodeBranch,
  faGlobe,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
  Link: ({ className = "" }) => (
    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={className} />
  ),
  CodeBranch: ({ className = "" }) => (
    <FontAwesomeIcon icon={faCodeBranch} className={className} />
  ),
  GitHub: ({ className = "" }) => (
    <FontAwesomeIcon icon={faGithub} className={className} />
  ),
  Globe: ({ className = "" }) => (
    <FontAwesomeIcon icon={faGlobe} className={className} />
  ),
  Update: ({ className = "" }) => (
    <FontAwesomeIcon icon={faClockRotateLeft} className={className} />
  ),
  Add: ({ className = "" }) => (
    <FontAwesomeIcon icon={faAdd} className={className} />
  ),
};
