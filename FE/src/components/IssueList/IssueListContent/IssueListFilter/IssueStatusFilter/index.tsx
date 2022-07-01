import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";

import API from "@/apis";
import { PatchIssueStatusType } from "@/apis/type";
import DropdownMenu from "@/components/common/DropdownMenu";
import Icon from "@/components/common/Icon";
import { issueCheck } from "@/recoil/issueList/atom";

import * as S from "./style";

type IssueStatusType = {
  handleOpenIssue: () => void;
};

const IssueStatusFilter = ({ handleOpenIssue }: IssueStatusType) => {
  const [checkedIssueId, setCheckedIssueId] = useRecoilState(issueCheck);

  const queryClient = useQueryClient();

  const { data, mutate: setIssueStatus } = useMutation(API.patchIssueStatus, {
    onSuccess() {
      queryClient.invalidateQueries(["issues"]);
    },
  });

  const FilterListTemplate: { name: string; action: "OPEN" | "CLOSE" }[] = [
    { name: "선택한 이슈 열기", action: "OPEN" },
    { name: "선택한 이슈 닫기", action: "CLOSE" },
  ];

  const FilterButton = (
    <S.FilterButton>
      <span>상태 수정</span>
      <Icon type="arrowDown" />
    </S.FilterButton>
  );

  const FilterTitle = <S.FilterTitle>상태 변경</S.FilterTitle>;

  const FilterListComponents = FilterListTemplate?.map(({ name, action }, idx) => {
    const handleSetIssueStatus = () => {
      setIssueStatus({ issueIds: Array.from(checkedIssueId), status: action });

      setCheckedIssueId((checkBoxes) => {
        checkBoxes.clear();
        return checkBoxes;
      });

      handleOpenIssue();
    };

    return (
      <S.FilterList key={name + idx} onClick={handleSetIssueStatus}>
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
