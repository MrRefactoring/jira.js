import { IssueTypeUpdate } from '../models/index.mjs';

export interface UpdateIssueType extends IssueTypeUpdate {
  /** The ID of the issue type. */
  id: string;
}
