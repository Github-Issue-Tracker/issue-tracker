import { NavLink } from "react-router-dom";

import Button from "@/components/common/Button";
import FilterButton from "@/components/common/FilterButton";
import Icon from "@/components/common/Icon";
import Header from "@/components/LabelMilestone/Header";
import { COLOR, FONTSIZE, FONTWEIGHT } from "@/styles/constTheme";

import * as S from "./style";

const MilestonePage = () => {
  return (
    <>
      <Header />
      <div>This is Milestone</div>
    </>
  );
};

export default MilestonePage;
