import { cursorTo } from "readline";

import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { IssueType } from "@/apis/type";
import Icon from "@/components/common/Icon";
import Label from "@/components/common/Label";
import { issueCheck } from "@/recoil/issueList";
import { COLOR } from "@/styles/constTheme";
import { timeStampInfoTemplate } from "@/utils";

import * as S from "./style";

const IssueListItem = (issueInfo: IssueType) => {
  const [checks, setChecks] = useRecoilState(issueCheck);

  const { issueNumber, issueTitle, createdAt, milestoneTitle, labels, author, authorImage } = issueInfo;

  // NOTE: input 체크 요소

  const handleCheckToggle = useCallback(
    (id: number) => {
      if (checks.has(id)) {
        setChecks((curr) => {
          curr?.delete(id);
          return new Set(curr);
        });
      } else {
        setChecks((curr) => {
          curr?.add(id);
          return new Set(curr);
        });
      }
    },
    [checks, setChecks]
  );

  return (
    <S.IssueListItem>
      <S.IssueCheckBox
        checkList={checks}
        isChecked={checks.has(issueNumber)}
        onClick={() => handleCheckToggle(issueNumber)}
      />
      <S.ContentBox>
        <S.IssueHeader>
          <Icon type="alertCircle" strokecolor={COLOR["blue-400"]} />
          <S.IssueTitle>{issueTitle}</S.IssueTitle>
          {labels?.map(({ name, backgroundColor }) => (
            <Label key={name} name={name} backgroundColor={backgroundColor} />
          ))}
        </S.IssueHeader>
        <S.IssueInfo>
          <span>#{issueNumber}</span>
          <span>{timeStampInfoTemplate(createdAt, author)}</span>
          <span>
            <Icon type="milestone" />
            {milestoneTitle}
          </span>
        </S.IssueInfo>
      </S.ContentBox>
      <S.UserIcon src={authorImage} />
    </S.IssueListItem>
  );
};
export default IssueListItem;
