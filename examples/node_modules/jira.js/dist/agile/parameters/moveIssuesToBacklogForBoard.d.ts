export interface MoveIssuesToBacklogForBoard {
    boardId: number;
    issues?: string[];
    rankBeforeIssue?: string;
    rankAfterIssue?: string;
    rankCustomFieldId?: number;
}
