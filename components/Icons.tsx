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
  faCode,
  faPalette,
  faGear,
  faRocket,
  faUsers,
  faBug,
  faFileCode,
  faCubes,
  faListCheck,
  faVialCircleCheck,
  faAngleDown,
  faMobileScreenButton,
  faEye,
  faUniversalAccess,
  faGaugeHigh,
  faHourglassHalf,
  faCloudArrowDown,
  faBarsProgress,
  faFileLines,
  faChartDiagram,
  faPeopleRoof,
  faLaptopCode,
  faCalendar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

interface IconProps {
  className?: string;
}

export const Icons = {
  Filter: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faFilter} className={className} />
  ),
  Calendar: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faCalendar} className={className} />
  ),
  Location: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faLocationDot} className={className} />
  ),
  LaptopCode: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faLaptopCode} className={className} />
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
  File: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faFileCode} className={className} />
  ),
  ListCheck: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faListCheck} className={className} />
  ),
  Test: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faVialCircleCheck} className={className} />
  ),
  Cubes: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faCubes} className={className} />
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
  AngleDown: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faAngleDown} className={className} />
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
  Mobile: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faMobileScreenButton} className={className} />
  ),
  Gear: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faGear} className={className} />
  ),
  Rocket: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faRocket} className={className} />
  ),
  Palette: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faPalette} className={className} />
  ),
  Code: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faCode} className={className} />
  ),
  CodeBranch: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faCodeBranch} className={className} />
  ),
  GitHub: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faGithub} className={className} />
  ),
  Users: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faUsers} className={className} />
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
  Bug: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faBug} className={className} />
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
  Eye: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faEye} className={className} />
  ),
  UniversalAccess: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faUniversalAccess} className={className} />
  ),
  GaugeHigh: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faGaugeHigh} className={className} />
  ),
  HourGlass: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faHourglassHalf} className={className} />
  ),
  CloudArrowDown: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faCloudArrowDown} className={className} />
  ),
  BarsProgress: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faBarsProgress} className={className} />
  ),
  FileLines: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faFileLines} className={className} />
  ),
  ChartDiagram: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faChartDiagram} className={className} />
  ),
  PeopleRoof: ({ className = "" }: IconProps) => (
    <FontAwesomeIcon icon={faPeopleRoof} className={className} />
  ),
} as const;

export type IconsType = keyof typeof Icons;
