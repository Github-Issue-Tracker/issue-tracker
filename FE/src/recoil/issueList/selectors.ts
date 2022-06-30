import { selector } from "recoil";

import { issueCheck } from "./atom";

export const setCheckIssueId = selector({
  key: "setCheckIssueId",
  get: ({ get }) => get(issueCheck),
  set: ({ set }, newValue) => {
    set(issueCheck, newValue);
  },
});
