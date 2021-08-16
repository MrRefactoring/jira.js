/** @deprecated Use IssueCommentListRequest instead. */
export type IssueCommentListRequestBean = IssueCommentListRequest;

export interface IssueCommentListRequest {
  /** The list of comment IDs. A maximum of 1000 IDs can be specified. */
  ids: number[];
}
