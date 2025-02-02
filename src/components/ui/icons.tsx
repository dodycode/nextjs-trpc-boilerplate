import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  FileQuestionIcon,
  FileTextIcon,
  GalleryHorizontalEndIcon,
  PanelLeftIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { HamburgerMenuIcon } from "./icons/hamburger-menu-icon";
import { SpinnerIcon } from "./icons/spinner-icon";

const icons = {
  galleryVerticalEnd: GalleryHorizontalEndIcon,
  spinner: SpinnerIcon,
  panelLeft: PanelLeftIcon,
  fileText: FileTextIcon,
  FileQuestion: FileQuestionIcon,
  close: XIcon,
  hamburgerMenu: HamburgerMenuIcon,
} as const;

export type IconProps = Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>;
export type Icon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type IconType = keyof typeof icons;

const Icon: React.FC<{
  type: IconType;
  className?: string;
  style?: React.CSSProperties;
}> = ({ type, className, style }) => {
  const IconComponent = icons[type];

  return <IconComponent className={cn("size-4", className)} style={style} />;
};

export { Icon };
