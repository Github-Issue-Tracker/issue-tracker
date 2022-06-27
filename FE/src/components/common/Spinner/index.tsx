import { Oval } from "react-loader-spinner";

import { COLOR } from "@/styles/constTheme";

import * as S from "./style";

const Spinner = () => {
  return (
    <S.Container>
      <Oval height="100" width="100" color={COLOR["blue-700"]} secondaryColor={COLOR["blue-400"]} ariaLabel="loading" />
    </S.Container>
  );
};

export default Spinner;
