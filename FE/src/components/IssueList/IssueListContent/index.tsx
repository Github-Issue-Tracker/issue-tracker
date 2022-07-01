import { useMemo, useState, useEffect } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import API from "@/apis";
import { IssueType, PatchIssueStatusType } from "@/apis/type";
import ListLayout from "@/components/common/ListLayout";
import IssueListFilter from "@/components/IssueList/IssueListContent/IssueListFilter";
import IssueListItem from "@/components/IssueList/IssueListContent/IssueListItem";
import { issueCheck } from "@/recoil/issueList";

import * as S from "./style";

const IssueListContent = () => {
  const [isOpenIssue, setIsOpenIssue] = useState<boolean>(true);
  const checks = useRecoilValue(issueCheck);
  const [issueList, setIssueList] = useState([] as IssueType[] | undefined);

  const { data: openIssueList, refetch: fetchOpenIssue } = useQuery(["issues", "open"], API.getIssueList, {
    enabled: true,
  });

  const { data: closeIssueList, refetch: fetchCloseIssue } = useQuery(["issues", "close"], API.getCloseIssueList, {});

  const handleOpenIssue = () => {
    fetchOpenIssue();
    setIsOpenIssue(true);
    setIssueList(openIssueList?.data);
  };
  const handleCloseIssue = () => {
    fetchCloseIssue();
    setIsOpenIssue(false);
    setIssueList(closeIssueList?.data);
  };

  useEffect(() => {
    setIssueList(openIssueList?.data);
  }, [openIssueList?.data]);

  const isAllCheck = useMemo(() => checks.size === issueList?.length, [checks.size, issueList?.length]);

  const issueNumberList = useMemo(() => issueList?.map(({ issueNumber }) => issueNumber), [issueList]);

  const IssueListComponents = issueList?.map((issueInfo: IssueType) => {
    return <IssueListItem key={issueInfo.issueId} {...issueInfo} />;
  });

  return (
    <S.Container>
      {/* <button onClick={() => handleEditIssueList({ issueId: [1, 2], status: "OPEN" })}>수정하기</button> */}
      <ListLayout
        width={1280}
        titleComponent={
          <IssueListFilter
            handleOpenIssue={handleOpenIssue}
            handleCloseIssue={handleCloseIssue}
            fetchOpenIssue={fetchOpenIssue}
            fetchCloseIssue={fetchCloseIssue}
            isAllCheck={isAllCheck}
            issueNumberList={issueNumberList}
            isOpenIssue={isOpenIssue}
          />
        }
        listComponents={issueList?.length ? IssueListComponents : <S.NoValue>작성된 글이 없습니다.</S.NoValue>}
      />
    </S.Container>
  );
};

export default IssueListContent;
