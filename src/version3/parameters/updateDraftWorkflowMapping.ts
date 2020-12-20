import { IssueTypesWorkflowMapping } from '../models';

export interface UpdateDraftWorkflowMapping extends IssueTypesWorkflowMapping {
  /** The ID of the workflow scheme that the draft belongs to. */
  id: number;
  /** The name of the workflow. */
  workflowName: string;
}
