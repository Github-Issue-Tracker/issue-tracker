import { useState } from "react";
import { useQuery } from "react-query";

import API from "@/apis/index";
import { LabelType } from "@/apis/type";
import DropdownMenu from "@/components/common/DropdownMenu";
import Icon from "@/components/common/Icon";

import * as S from "./style";

const LabelFilter = () => {
  const [issueFilter, setIssueFilter] = useState(null);

  const { isLoading, data } = useQuery("issue-labels", API.getLabelList);

  const FilterButton = (
    <>
      <span>레이블</span>
      <Icon type="arrowDown" />
    </>
  );

  const FilterTitle = <S.FilterTitle>레이블 필터</S.FilterTitle>;

  const FilterListComponents = data?.data.map((el: LabelType) => {
    const handleClickFilter = () => {
      /**
       * TODO:
       * - search filter state에 value 전달
       * - drop down menu 끄기
       */
    };

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    return (
      <S.FilterList key={el.labelId} onClick={handleClickFilter}>
        <S.FrontBox>
          {el.backgroundColor && <Icon type="colorCircle" fillcolor={el.backgroundColor} />}
          <span>{el.name}</span>
        </S.FrontBox>
        {issueFilter ? <Icon type="checkRadioButton" /> : <Icon type="emptyRadioButton" />}
      </S.FilterList>
    );
  });

  return (
    <DropdownMenu
      buttonComponent={FilterButton}
      titleComponent={FilterTitle}
      listComponents={FilterListComponents}
      buttonWidth={80}
      dropdownWidth={240}
    />
  );
};

export default LabelFilter;
