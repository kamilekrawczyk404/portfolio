import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faClose,
  faArrowRight,
  faCaretDown,
  faAngleRight,
  faAngleLeft,
  faSun,
  faMoon,
  faArrowUpRightFromSquare,
  faCodeBranch,
  faGlobe,
  faClockRotateLeft,
  faAdd,
  faTrash,
  faCheck,
  faPhone,
  faEnvelope,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

interface IconProps {
  className?: string;
}

export const Icons = {
  Filter: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faFilter} className={className} />
  ),
  Refresh: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faArrowsRotate} className={className} />
  ),
  Close: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faClose} className={className} />
  ),
  Arrow: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faArrowRight} className={className} />
  ),
  CaretDown: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faCaretDown} className={className} />
  ),
  AngleRight: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faAngleRight} className={className} />
  ),
  AngleLeft: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faAngleLeft} className={className} />
  ),
  Sun: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faSun} className={className} />
  ),
  Moon: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faMoon} className={className} />
  ),
  Link: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={className} />
  ),
  CodeBranch: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faCodeBranch} className={className} />
  ),
  GitHub: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faGithub} className={className} />
  ),
  Globe: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faGlobe} className={className} />
  ),
  Update: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faClockRotateLeft} className={className} />
  ),
  Add: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faAdd} className={className} />
  ),
  Trash: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faTrash} className={className} />
  ),
  Check: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faCheck} className={className} />
  ),
  Linkedin: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faLinkedin} className={className} />
  ),
  Phone: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faPhone} className={className} />
  ),
  Envelope: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faEnvelope} className={className} />
  ),
} as const;

export type IconsType = keyof typeof Icons;
