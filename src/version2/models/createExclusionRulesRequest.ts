export interface CreateExclusionRulesRequest {
  /** The IDs of the issues to exclude from the plan. */
  issueIds?: number[];
  /** The IDs of the issue types to exclude from the plan. */
  issueTypeIds?: number[];
  /** Issues completed this number of days ago will be excluded from the plan. */
  numberOfDaysToShowCompletedIssues?: number;
  /** The IDs of the releases to exclude from the plan. */
  releaseIds?: number[];
  /** The IDs of the work status categories to exclude from the plan. */
  workStatusCategoryIds?: number[];
  /** The IDs of the work statuses to exclude from the plan. */
  workStatusIds?: number[];
}
