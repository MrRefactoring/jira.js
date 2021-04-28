import { NestedResponse } from './nestedResponse';

/**
 * Details about a created issue or subtask. */
export interface CreatedIssue {
  /** The ID of the created issue or subtask. */
  id: string;
  /** The key of the created issue or subtask. */
  key: string;
  /** The URL of the created issue or subtask. */
  self: string;
  /** The response code and messages related to any requested transition. */
  transition?: NestedResponse[];
}
