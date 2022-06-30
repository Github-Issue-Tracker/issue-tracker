import styled from "styled-components";

import CheckBox from "@/components/common/CheckBox";
import { COLOR, FONTSIZE } from "@/styles/constTheme";

export const IssueListFilter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18rem 30rem 18rem 32rem;
  height: 64rem;
`;

export const IssueCountTemplate = styled.span`
  color: ${COLOR["gray-900"]};
`;

export const IssueCheckBox = styled(CheckBox)`
  margin-right: 33rem;
  margin-left: 17rem;
`;

export const FilterBox = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 30rem;
  gap: 20rem;
`;

export const Title = styled.div`
  font-size: ${FONTSIZE.L};
`;
