import styled from "styled-components";

import { COLOR, FONTSIZE } from "@/styles/constTheme";

type LabelBoxType = {
  backgroundColor: string;
  color: string;
};

export const LabelListBox = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${COLOR["gray-950"]};
`;

export const FrontBox = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
`;

export const BackBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30rem;
  button:nth-child(1) {
    color: gray;
  }
  button:nth-child(2) {
    color: red;
  }
`;

export const LabelBox = styled.div<LabelBoxType>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.color === "DARK" ? "black" : "white")};
  background-color: ${(props) => `${props.backgroundColor}`};
  padding: 10rem 20rem;
  border-radius: 12rem;
  display: inline-block;
`;

export const LabelBoxWrapper = styled.div`
  width: 200rem;
`;

export const LabelDescription = styled.div`
  color: gray;
`;
