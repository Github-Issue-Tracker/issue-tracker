import { useMutation, useQuery } from "react-query";

import API from "@/apis";
import { LabelType } from "@/apis/type";
import ListLayout from "@/components/common/ListLayout";
import Header from "@/components/LabelMilestone/Header";

import * as S from "./style";

const LabelPage = () => {
  const { isLoading, data } = useQuery("issue-labels", API.getLabelList);

  const LabelListComponents = data?.data.map((el: LabelType) => {
    const handleClickLabelEdit = () => {};
    const handleClickLabelDelete = () => {};

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    return (
      <S.LabelListBox key={el.labelId}>
        <S.FrontBox>
          <S.LabelBoxWrapper>
            <S.LabelBox backgroundColor={el.backgroundColor} color={el.fontColor}>
              {el.name}
            </S.LabelBox>
          </S.LabelBoxWrapper>
          <S.LabelDescription>{el.description}</S.LabelDescription>
        </S.FrontBox>
        <S.BackBox>
          <button>편집</button>
          <button>삭제</button>
        </S.BackBox>
      </S.LabelListBox>
    );
  });

  const numOfLabel = data?.data.length;
  const LabelListTitle = () => <div>{`${numOfLabel}개의 레이블`}</div>;

  return (
    <>
      <Header />
      <ListLayout width={1280} titleComponent={<LabelListTitle />} listComponents={LabelListComponents} />
    </>
  );
};

export default LabelPage;
