export interface MoveIssuesToBoard {
  boardId: number;
  issues?: string[];
  rankBeforeIssue?: string;
  rankAfterIssue?: string;
  rankCustomFieldId?: number;
}
