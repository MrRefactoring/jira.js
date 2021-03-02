import { IssueTypeUpdateBean } from '../models';

export interface UpdateIssueType extends IssueTypeUpdateBean {
  /** The ID of the issue type. */
  id: string;
}
