import { atom } from "recoil";

export const issueCheck = atom<Set<number>>({
  key: "issueCheck",
  default: new Set(),
});
