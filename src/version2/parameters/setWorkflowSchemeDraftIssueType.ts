import { IssueTypeWorkflowMapping } from '../models';

export interface SetWorkflowSchemeDraftIssueType extends IssueTypeWorkflowMapping {
  /** The ID of the workflow scheme that the draft belongs to. */
  id: number;
  /** The ID of the issue type. */
  issueType: string;
}
