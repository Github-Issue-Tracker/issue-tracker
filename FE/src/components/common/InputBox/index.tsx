import { ChangeEventHandler } from "react";

import * as S from "./style";

import type { StyleProps } from "@/components/common/type";

export type InputBoxProps = {
  value?: string;
  onChange?: ChangeEventHandler;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  size?: number;
} & StyleProps;

const InputBox = ({ value, onChange, defaultValue, placeholder, maxLength, size, ...props }: InputBoxProps) => {
  return (
    <S.InputBox
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder={placeholder}
      maxLength={maxLength}
      size={size}
      {...props}
    />
  );
};

export default InputBox;
