import { memo, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import API from "@/apis";
import CheckBox from "@/components/common/CheckBox";
import FilterButton from "@/components/common/FilterButton";
import Icon from "@/components/common/Icon";
import AssigneeFilter from "@/components/IssueList/IssueListContent/IssueListFilter/AssigneeFilter";
import IssueStatusFilter from "@/components/IssueList/IssueListContent/IssueListFilter/IssueStatusFilter";
import LabelFilter from "@/components/IssueList/IssueListContent/IssueListFilter/LabelFilter";
import MilestoneFilter from "@/components/IssueList/IssueListContent/IssueListFilter/MilestoneFilter";
import WriterFilter from "@/components/IssueList/IssueListContent/IssueListFilter/WriterFilter";
import { issueCheck } from "@/recoil/issueList/atom";
import { COLOR, FONTWEIGHT } from "@/styles/constTheme";

import * as S from "./style";

type IssueListFilterType = {
  isAllCheck: boolean;
  issueNumberList: number[] | undefined;
  handleOpenIssue: () => void;
  handleCloseIssue: () => void;
  fetchOpenIssue: () => void;
  fetchCloseIssue: () => void;
  isOpenIssue: boolean;
};

const IssueListFilter = ({
  isAllCheck,
  issueNumberList,
  handleOpenIssue,
  handleCloseIssue,
  isOpenIssue,
}: IssueListFilterType) => {
  const [checks, setChecks] = useRecoilState(issueCheck);

  const handleAllCheck = () => {
    if (isAllCheck) {
      setChecks((prev) => {
        prev.clear();
        return new Set(prev);
      });
    } else {
      setChecks((prev) => {
        prev.clear();

        issueNumberList?.forEach((issueNumber) => {
          prev.add(issueNumber);
        });

        return new Set(prev);
      });
    }
  };

  return (
    <S.IssueListFilter>
      <S.IssueCheckBox isChecked={isAllCheck} checkList={checks} onClick={handleAllCheck} />
      {checks.size ? (
        <>
          <S.IssueCountTemplate>{checks.size}개 이슈 선택</S.IssueCountTemplate>
          <S.FilterBox>
            <IssueStatusFilter handleOpenIssue={handleOpenIssue} />
          </S.FilterBox>
        </>
      ) : (
        <>
          <FilterButton
            text="열린 이슈"
            isIconFirst={true}
            svgIcon={<Icon type="alertCircle" strokecolor={isOpenIssue ? COLOR["black-400"] : COLOR["gray-900"]} />}
            color={isOpenIssue ? COLOR["black-400"] : COLOR["gray-900"]}
            fontWeight={FONTWEIGHT.bold}
            onClick={handleOpenIssue}
          />
          <FilterButton
            text="닫힌 이슈"
            isIconFirst={true}
            svgIcon={<Icon type="archive" strokecolor={!isOpenIssue ? COLOR["black-400"] : COLOR["gray-900"]} />}
            color={!isOpenIssue ? COLOR["black-400"] : COLOR["gray-900"]}
            fontWeight={FONTWEIGHT.bold}
            style={{ marginLeft: "24rem" }}
            onClick={handleCloseIssue}
          />
          <S.FilterBox>
            <AssigneeFilter />
            <LabelFilter />
            <MilestoneFilter />
            <WriterFilter />
          </S.FilterBox>
        </>
      )}
    </S.IssueListFilter>
  );
};

export default IssueListFilter;
