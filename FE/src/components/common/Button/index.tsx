import * as S from "@/components/common/Button/style";

export type ButtonProps = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  width?: number;
  fontSize?: number;
  backgroundColor?: string;
  color?: string;
};

const Button = ({ children, onClick, width, fontSize, backgroundColor, color }: ButtonProps) => {
  return (
    <S.Button
      width={width}
      onClick={(event) => onClick(event)}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      color={color}
    >
      {children}
    </S.Button>
  );
};
export default Button;
