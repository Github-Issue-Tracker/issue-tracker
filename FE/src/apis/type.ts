export type IssueType = {
  issueId: number;
  issueNumber: number;
  issueTitle: string;
  content?: string;
  issueStatus: string;
  createdAt: string;
  milestoneTitle: string;
  labels: MilestoneType[];
  author: string;
  authorImage: string;
};

export type MilestoneType = {
  name: string;
  backgroundColor: string;
  fontColor: "BRIGHT" | "DARK";
};

export type PatchIssueStatusType = {
  issueId: number[];
  status: "OPEN" | "CLOSE";
};
