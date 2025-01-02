export interface GetIssueEstimationForBoard {
  /** The ID or key of the requested issue. */
  issueIdOrKey: string;
  /** The ID of the board required to determine which field is used for estimation. */
  boardId?: number;
}
