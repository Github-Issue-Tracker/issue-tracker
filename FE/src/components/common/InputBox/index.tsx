import { ChangeEventHandler } from "react";

import * as S from "./style";

import type { StyleProps } from "@/components/common/type";

export type InputBoxProps = {
  value?: string;
  onChange?: ChangeEventHandler;
  onSubmit?: () => void;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  size?: number;
} & StyleProps;

const InputBox = ({
  value,
  onChange,
  onSubmit,
  defaultValue,
  placeholder,
  maxLength,
  size,
  ...props
}: InputBoxProps) => {
  return (
    <S.InputBox
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      defaultValue={defaultValue}
      placeholder={placeholder}
      maxLength={maxLength}
      size={size}
      {...props}
    />
  );
};

export default InputBox;
