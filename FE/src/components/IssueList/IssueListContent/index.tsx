import { AxiosPromise } from "axios";
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
  // const queryClient = useQueryClient();
  // const { data: issueList } = useQuery(["issues"], API.getIssueList);

  // const { data, mutate } = useMutation(API.patchIssueStatus, {
  //   onSuccess() {
  //     queryClient.invalidateQueries(["issues"]);
  //   },
  // });
  // console.log("editIssueList :>> ", data);
  // const handleEditIssueList = ({ issueId, status }: PatchIssueStatusType) => {
  //   mutate({
  //     issueId: issueId,
  //     status: status,
  //   });
  // };

  // FIXME: mockdata
  const issueList: IssueType[] = [
    {
      issueId: 1,
      issueTitle: "UI-header",
      issueStatus: "OPEN",
      issueNumber: 1,
      author: "jwu",
      authorImage: "https://sally-issuetracker.s3.ap-northeast-2.amazonaws.com/%EB%9D%BC%EC%9D%B4%EC%96%B8.PNG",
      createdAt: "2022-06-24T10:27:17",
      milestoneTitle: "week1",
      labels: [
        {
          name: "FE",
          backgroundColor: "#ff0000",
          fontColor: "BRIGHT",
        },
        {
          name: "feature",
          backgroundColor: "#ffa500",
          fontColor: "DARK",
        },
      ],
    },
    {
      issueId: 2,
      issueTitle: "UI-header",
      issueStatus: "OPEN",
      issueNumber: 2,
      author: "jwu",
      authorImage: "https://sally-issuetracker.s3.ap-northeast-2.amazonaws.com/%EB%9D%BC%EC%9D%B4%EC%96%B8.PNG",
      createdAt: "2022-06-24T10:27:17",
      milestoneTitle: "week1",
      labels: [
        {
          name: "FE",
          backgroundColor: "#ff0000",
          fontColor: "BRIGHT",
        },
        {
          name: "feature",
          backgroundColor: "#ffa500",
          fontColor: "DARK",
        },
      ],
    },
  ];

  const checks = useRecoilValue(issueCheck);

  const isAllCheck = useMemo(() => checks.size === issueList?.length, [checks.size]);

  const issueNumberList = useMemo(() => issueList?.map(({ issueNumber }) => issueNumber), [issueList]);

  const IssueListComponents = issueList?.map((issueInfo: IssueType) => {
    return <IssueListItem key={issueInfo.issueId} {...issueInfo} />;
  });

  return (
    <S.Container>
      {/* <button onClick={() => handleEditIssueList({ issueId: [1, 2], status: "OPEN" })}>수정하기</button> */}
      <ListLayout
        width={1280}
        titleComponent={<IssueListFilter isAllCheck={isAllCheck} issueNumberList={issueNumberList} />}
        listComponents={IssueListComponents}
      />
    </S.Container>
  );
};

export default IssueListContent;
