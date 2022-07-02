/** @deprecated Use {@link IssueRankRequest} instead. */
export type IssueRankRequestBean = IssueRankRequest;

export interface IssueRankRequest {
  issues?: string[];
  rankBeforeIssue?: string;
  rankAfterIssue?: string;
  rankCustomFieldId?: number;
}
