import { IconType } from "react-icons";
import * as aiIcons from "react-icons/ai";
import * as biIcons from "react-icons/bi";
import * as bsIcons from "react-icons/bs";
import * as faIcons from "react-icons/fa";
import * as ciIcons from "react-icons/ci";
import * as hiIcons from "react-icons/hi";
import * as mdIcons from "react-icons/md";
import * as luIcons from "react-icons/lu";
import * as tbIcons from "react-icons/tb";
import { twMerge } from "tailwind-merge";
interface IconProps {
  icon: string;
  className?: string;
  size?: number;
  color?: string;
  bgColor?: string;
}

const GetIcon = ({ icon, className, size, color, bgColor }: IconProps) => {
  const getIcon = (iconName: string) => {
    const iconsMap = new Map();
    iconsMap.set("Bs", bsIcons);
    iconsMap.set("Ai", aiIcons);
    iconsMap.set("Bi", biIcons);
    iconsMap.set("Ci", ciIcons);
    iconsMap.set("Fa", faIcons);
    iconsMap.set("Lu", luIcons);
    iconsMap.set("Md", mdIcons);
    iconsMap.set("Hi", hiIcons);
    iconsMap.set("Tb", tbIcons);

    return iconsMap.get(iconName.substring(0, 2));
  };

  const icons: any = getIcon(icon);
  const TheIcon: IconType = icons[icon];
  const classIcon = twMerge("", className);
  return <TheIcon size={size} className={classIcon} />;
};

export default GetIcon;
