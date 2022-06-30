import styled from "styled-components";

import { COLOR } from "@/styles/constTheme";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rem;
`;

export const OptionTab = styled.div`
  display: flex;
  border: 1rem solid ${COLOR["gray-500"]};
  border-radius: 11rem;

  button + button {
    border-left: 1rem solid ${COLOR["gray-500"]};
    border-radius: 0rem;
  }
`;
