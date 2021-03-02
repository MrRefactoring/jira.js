export interface MoveIssuesToSprintAndRank {
  /** The ID of the sprint that you want to assign issues to. */
  sprintId: number;
  issues?: string[];
  rankBeforeIssue?: string;
  rankAfterIssue?: string;
  rankCustomFieldId?: number;
}
