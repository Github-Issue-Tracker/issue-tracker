import { AxiosRequestConfig } from "axios";

import newAxios from "@/apis/core";

import type { PatchIssueStatusType, IssueType } from "@/apis/type";

const API = {
  getIssueList: (config?: AxiosRequestConfig) => {
    return newAxios({
      method: "get",
      url: "/api/issue-tracker/issues/",
      ...config,
    });
  },

  patchIssueStatus: (data: PatchIssueStatusType, config?: AxiosRequestConfig) => {
    return newAxios({
      method: "patch",
      url: "/api/issue-tracker/issues/status/",
      data: data,
      ...config,
    });
  },

  getLabelList: (config?: AxiosRequestConfig) => {
    return newAxios({
      method: "get",
      url: "/api/issue-tracker/labels",
      ...config,
    });
  },

  getMilestoneList: (config?: AxiosRequestConfig) => {
    return newAxios({
      method: "get",
      url: "/api/issue-tracker/milestones/list",
      ...config,
    });
  },
};

export default API;
