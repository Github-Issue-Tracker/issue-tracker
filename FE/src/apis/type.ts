export type IssueType = {
  issueId: number;
  issueNumber: number;
  issueTitle: string;
  content?: string;
  issueStatus: string;
  createdAt: string;
  milestoneTitle: string;
  labels: LabelType[];
  author: string;
  authorImage: string;
};

export type LabelType = {
  labelId: string;
  name: string;
  description: string;
  backgroundColor: string;
  fontColor: "BRIGHT" | "DARK";
};

export type MilestoneType = {
  id: number;
  title: string;
  description: string;
  completionDate: string;
  // name: string;
  // backgroundColor: string;
  // fontColor: "BRIGHT" | "DARK";
};

export type PatchIssueStatusType = {
  issueId: number[];
  status: "OPEN" | "CLOSE";
};
