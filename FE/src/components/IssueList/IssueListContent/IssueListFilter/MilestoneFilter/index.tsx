import { useState } from "react";
import { useQuery } from "react-query";

import API from "@/apis/index";
import { MilestoneType } from "@/apis/type";
import DropdownMenu from "@/components/common/DropdownMenu";
import Icon from "@/components/common/Icon";

import * as S from "./style";

const MilestoneFilter = () => {
  const [issueFilter, setIssueFilter] = useState(null);

  const { isLoading, data } = useQuery("issue-milestions", API.getMilestoneList);

  const FilterButton = (
    <>
      <span>마일스톤</span>
      <Icon type="arrowDown" />
    </>
  );

  const FilterTitle = <S.FilterTitle>마일스톤 필터</S.FilterTitle>;

  const FilterListComponents = data?.data.map((el: MilestoneType) => {
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
      <S.FilterList key={el.id} onClick={handleClickFilter}>
        <span>{el.title}</span>
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

export default MilestoneFilter;
