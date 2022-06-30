import { useState } from "react";

import DropdownMenu from "@/components/common/DropdownMenu";
import Icon from "@/components/common/Icon";

import * as S from "./style";

const IssueStatusFilter = () => {
  const [issueFilter, setIssueFilter] = useState(null);

  const FilterListTemplate = [{ name: "선택한 이슈 열기" }, { name: "선택한 이슈 닫기" }];

  const FilterButton = (
    <S.FilterButton>
      <span>상태 수정</span>
      <Icon type="arrowDown" />
    </S.FilterButton>
  );

  const FilterTitle = <S.FilterTitle>상태 변경</S.FilterTitle>;

  const FilterListComponents = FilterListTemplate?.map(({ name }, idx) => {
    const handleClickFilter = () => {};

    return (
      <S.FilterList key={idx} onClick={handleClickFilter}>
        <span>{name}</span>
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

export default IssueStatusFilter;
