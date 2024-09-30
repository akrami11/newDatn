import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faChartColumn,
  faLayerGroup,
  faUserClock,
  faUserPen,
  faUserTie,
  faWarning,
  faBars,
  faToggleOff,
  faToggleOn,
  faPen,
  faCheck,
  faFileInvoiceDollar,
  faChartLine,
  faList,
  faBook,
  faWarehouse,
  faBuildingUser,
  faShop,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faHome,
  faBookmark,
  faComment,
  faThumbsUp,
  faThumbsDown,
  faReply,
  faShare,
  faGear,
  faUpload,
  faPlus,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCalendar,
  faUserCircle,
  faBell,
  faSquarePlus,
  faFileLines,
  faFaceSmile,
  faClock,
} from '@fortawesome/free-regular-svg-icons';
import { faWordpress } from '@fortawesome/free-brands-svg-icons';

const getIcon = (icon) => {
  switch (icon) {
    case 'faArrowRightFromBracket':
      return faArrowRightFromBracket;
    case 'faArrowRightToBracket':
      return faArrowRightToBracket;
    case 'faChartColumn':
      return faChartColumn;
    case 'faLayerGroup':
      return faLayerGroup;
    case 'faUserClock':
      return faUserClock;
    case 'faUserPen':
      return faUserPen;
    case 'faUserTie':
      return faUserTie;
    case 'faWarning':
      return faWarning;
    case 'faBars':
      return faBars;
    case 'faCalendar':
      return faCalendar;
    case 'faUserCircle':
      return faUserCircle;
    case 'faToggleOff':
      return faToggleOff;
    case 'faToggleOn':
      return faToggleOn;
    case 'faBell':
      return faBell;
    case 'faComment':
      return faComment;
    case 'faWordpress':
      return faWordpress;
    case 'faSquarePlus':
      return faSquarePlus;
    case 'faPen':
      return faPen;
    case 'faCheck':
      return faCheck;
    case 'faFileInvoiceDollar':
      return faFileInvoiceDollar;
    case 'faFileLines':
      return faFileLines;
    case 'faChartLine':
      return faChartLine;
    case 'faList':
      return faList;
    case 'faBook':
      return faBook;
    case 'faWarehouse':
      return faWarehouse;
    case 'faBuildingUser':
      return faBuildingUser;
    case 'faShop':
      return faShop;
    case 'faTrash':
      return faTrash;
    case 'faChevronLeft':
      return faChevronLeft;
    case 'faChevronRight':
      return faChevronRight;
    case 'faChevronUp':
      return faChevronUp;
    case 'faBookmark':
      return faBookmark;
    case 'faHome':
      return faHome;
    case 'faFaceSmile':
      return faFaceSmile;
    case 'faThumbsUp':
      return faThumbsUp;
    case 'faThumbsDown':
      return faThumbsDown;
    case 'faClock':
      return faClock;
    case 'faReply':
      return faReply;
    case 'faShare':
      return faShare;
    case 'faGear':
      return faGear;
    case 'faUpload':
      return faUpload;
    case 'faPlus':
      return faPlus;
    case 'faCirclePlus':
      return faCirclePlus;
    default:
      return icon;
  }
};
export default getIcon;
