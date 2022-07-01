import { selector } from "recoil";

import { searchInputAtom } from "./atom";

export const setSearchFilter = selector({
  key: "setSearchFilter",
  get: ({ get }) => get(searchInputAtom),
});
