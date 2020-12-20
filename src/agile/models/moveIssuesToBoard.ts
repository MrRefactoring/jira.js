export interface MoveIssuesToBoard {
  entries?: {
    issueId?: number;
    issueKey?: string;
    status?: number;
    errors?: string[];
  }[];
}
