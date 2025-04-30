import type { IssueTypeUpdate } from '../models';

export interface UpdateIssueType extends IssueTypeUpdate {
  /** The ID of the issue type. */
  id: string;
}
