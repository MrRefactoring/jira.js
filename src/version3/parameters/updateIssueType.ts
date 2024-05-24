import type { IssueTypeUpdate } from '../models/index.js';

export interface UpdateIssueType extends IssueTypeUpdate {
  /** The ID of the issue type. */
  id: string;
}
