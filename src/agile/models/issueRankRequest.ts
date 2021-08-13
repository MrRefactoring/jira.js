/** @deprecated Use IssueRankRequest instead. */
export type IssueRankRequestBean = IssueRankRequest;

export interface IssueRankRequest {
  issues?: string[];
  rankBeforeIssue?: string;
  rankAfterIssue?: string;
  rankCustomFieldId?: number;
}
