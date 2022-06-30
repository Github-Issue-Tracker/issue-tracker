import { NavLink } from "react-router-dom";

import Button from "@/components/common/Button";
import FilterButton from "@/components/common/FilterButton";
import Icon from "@/components/common/Icon";
import { COLOR, FONTSIZE, FONTWEIGHT } from "@/styles/constTheme";

import * as S from "./style";

const Header = () => {
  const handleClick = () => {};
  return (
    <S.Container>
      <S.OptionTab>
        <NavLink to="/label">
          <FilterButton
            text="레이블"
            svgIcon={<Icon type="label" />}
            isIconFirst={true}
            width={160}
            height={40}
            fontWeight={FONTWEIGHT.bold}
            color={COLOR["gray-900"]}
            state={"(3)"}
          />
        </NavLink>
        <NavLink to="/milestone">
          <FilterButton
            text="마일스톤"
            svgIcon={<Icon type="milestone" />}
            isIconFirst={true}
            width={160}
            height={40}
            fontWeight={FONTWEIGHT.bold}
            color={COLOR["gray-900"]}
            state={"(3)"}
          />
        </NavLink>
      </S.OptionTab>

      <Button onClick={handleClick} width={120} fontSize={FONTSIZE.XS}>
        <Icon type="plus" strokecolor={COLOR["white-400"]} />
        추가
      </Button>
    </S.Container>
  );
};

export default Header;
