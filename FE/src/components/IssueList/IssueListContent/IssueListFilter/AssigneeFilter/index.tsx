import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import { AccountImg } from "@/components/common/AccountImg";
import DropdownMenu from "@/components/common/DropdownMenu";
import Icon from "@/components/common/Icon";
import { searchInputAtom } from "@/recoil/searchFilter/atom";

import * as S from "./style";

const AssigneeFilter = () => {
  const [issueFilter, setIssueFilter] = useState(null);
  const [searchInput, setSearchInput] = useRecoilState(searchInputAtom);

  const FilterListTemplate = [
    { name: "담당자가 없는 이슈", query: "none" },
    { name: "Jwu", accountImage: "https://avatars.githubusercontent.com/u/72546335?v=4", query: "Jwu" },
    { name: "Sally", accountImage: "https://avatars.githubusercontent.com/u/96989782?v=4", query: "Sally" },
    { name: "Oliver", accountImage: "https://avatars.githubusercontent.com/u/84956036?v=4", query: "Oliver" },
  ];

  const FilterButton = (
    <>
      <span>담당자</span>
      <Icon type="arrowDown" />
    </>
  );

  const FilterTitle = <S.FilterTitle>담당자 필터</S.FilterTitle>;

  const FilterListComponents = FilterListTemplate?.map(({ name, accountImage, query }, idx) => {
    const handleClickFilter = () => {
      setSearchInput((prev) => `${prev} assignee:${query}`);
    };

    return (
      <S.FilterList key={idx} onClick={handleClickFilter}>
        <S.FrontBox>
          {accountImage && <AccountImg src={accountImage} />}
          <span>{name}</span>
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

export default AssigneeFilter;
