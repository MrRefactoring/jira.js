import { IssueTypeWorkflowMapping } from '../models';

export interface SetWorkflowSchemeIssueType extends IssueTypeWorkflowMapping {
  /** The ID of the workflow scheme. */
  id: number;
  /** The ID of the issue type. */
  issueType: string;
}
