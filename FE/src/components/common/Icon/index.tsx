import SVG from "react-inlinesvg";
import styled from "styled-components";

import Alertcircle from "@/assets/AlertCircle.svg";
import Archive from "@/assets/Archive.svg";
import Arrowdown from "@/assets/ArrowDown.svg";
import CheckRadioButton from "@/assets/CheckRadioButton.svg";
import ColorCircle from "@/assets/ColorCircle.svg";
import EmptyRadioButton from "@/assets/EmptyRadioButton.svg";
import Label from "@/assets/Label.svg";
import Milestone from "@/assets/Milestone.svg";
import Plus from "@/assets/Plus.svg";
import Searchicon from "@/assets/SearchIcon.svg";
import Usericon from "@/assets/UserIcon.svg";
import { COLOR } from "@/styles/constTheme";

type IconProps = {
  type: keyof typeof SVGpath;
  strokecolor?: string;
  fillcolor?: string;
};

const SVGpath = {
  alertCircle: Alertcircle,
  archive: Archive,
  arrowDown: Arrowdown,
  label: Label,
  milestone: Milestone,
  plus: Plus,
  searchIcon: Searchicon,
  userIcon: Usericon,
  emptyRadioButton: EmptyRadioButton,
  checkRadioButton: CheckRadioButton,
  colorCircle: ColorCircle,
};

const Icon = ({ type, strokecolor, fillcolor }: IconProps) => {
  return <StyledSVGIcon src={SVGpath[type]} strokecolor={strokecolor} fillcolor={fillcolor} />;
};

const StyledSVGIcon = styled(SVG)<Pick<IconProps, "strokecolor" | "fillcolor">>`
  fill: ${({ fillcolor }) => fillcolor || "none"};
  * {
    fill: ${({ fillcolor }) => fillcolor || "none"};
  }

  stroke: ${({ strokecolor }) => strokecolor || COLOR["gray-900"]};
  * {
    stroke: ${({ strokecolor }) => strokecolor || COLOR["gray-900"]};
  }
`;

export default Icon;
