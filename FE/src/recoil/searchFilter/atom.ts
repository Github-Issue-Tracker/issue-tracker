import { atom } from "recoil";

export const searchInputAtom = atom<string>({
  key: "searchInputAtom",
  default: "is:open",
});
