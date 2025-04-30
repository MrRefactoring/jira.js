export interface GetExclusionRulesResponse {
  /** The IDs of the issues excluded from the plan. */
  issueIds?: number[];
  /** The IDs of the issue types excluded from the plan. */
  issueTypeIds?: number[];
  /** Issues completed this number of days ago are excluded from the plan. */
  numberOfDaysToShowCompletedIssues: number;
  /** The IDs of the releases excluded from the plan. */
  releaseIds?: number[];
  /** The IDs of the work status categories excluded from the plan. */
  workStatusCategoryIds?: number[];
  /** The IDs of the work statuses excluded from the plan. */
  workStatusIds?: number[];
}
