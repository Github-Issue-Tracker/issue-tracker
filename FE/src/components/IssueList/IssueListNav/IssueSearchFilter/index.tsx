import { useState, ChangeEvent } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import API from "@/apis";
import DropdownMenu from "@/components/common/DropdownMenu/index";
import Icon from "@/components/common/Icon";
import InputBox from "@/components/common/InputBox";
import { searchInputAtom } from "@/recoil/searchFilter/atom";
import { COLOR, FONTWEIGHT } from "@/styles/constTheme";

import * as S from "./style";

const IssueSearchFilter = () => {
  const [issueFilter, setIssueFilter] = useState(null);
  const [searchInput, setSearchInput] = useRecoilState(searchInputAtom);

  // const { data: searchData, refetch: fetchSearch } = useQuery(
  //   ["issueFilter", "search"],
  //   // @ts-ignore
  //   API.getSearchFilter(searchInput),
  //   {
  //     enabled: false,
  //   }
  // );

  const FilterListTemplate = [
    "열린 이슈",
    "내가 작성한 이슈",
    "나에게 할당된 이슈",
    "내가 댓글을 남긴 이슈",
    "닫힌 이슈",
  ];

  const FilterButton = (
    <>
      <span>필터</span>
      <Icon type="arrowDown" />
    </>
  );

  const FilterTitle = <S.FilterTitle>이슈 필터</S.FilterTitle>;

  const FilterListComponents = FilterListTemplate?.map((list, idx) => {
    const handleClickFilter = () => {};

    return (
      <S.FilterList key={idx} onClick={handleClickFilter}>
        <span>{list}</span>
        {issueFilter ? <Icon type="checkRadioButton" /> : <Icon type="emptyRadioButton" />}
      </S.FilterList>
    );
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSubmitSearch = () => {
    // fetchSearch();
    // console.log(searchData);
  };

  return (
    <S.FilterContainer>
      <DropdownMenu
        buttonComponent={FilterButton}
        titleComponent={FilterTitle}
        listComponents={FilterListComponents}
        buttonWidth={128}
        dropdownWidth={240}
      />
      <S.InputContainer>
        <Icon type="searchIcon" />
        <InputBox
          value={searchInput}
          onChange={handleChange}
          onSubmit={handleSubmitSearch}
          placeholder="Search all issues"
          color={COLOR["gray-700"]}
          maxLength={50}
          size={40}
        />
      </S.InputContainer>
    </S.FilterContainer>
  );
};

export default IssueSearchFilter;
