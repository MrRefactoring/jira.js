export interface WorklogsMoveRequest {
  /** A list of worklog IDs. */
  ids?: number[];
  /** The issue id or key of the destination issue */
  issueIdOrKey?: string;
}
