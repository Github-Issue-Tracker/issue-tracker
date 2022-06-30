import { ChangeEvent, useState } from "react";

import * as S from "./style";

type CheckBoxType = {
  checkList?: Set<number>;
  isChecked?: boolean;
  onClick?: () => void;
};

const CheckBox = ({ checkList, isChecked, onClick, ...rest }: CheckBoxType) => {
  const [check, setCheck] = useState(false);

  const handleChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  };

  return <S.Input type="checkbox" checked={isChecked} onClick={onClick} onChange={handleChangeCheck} {...rest} />;
};

export default CheckBox;
