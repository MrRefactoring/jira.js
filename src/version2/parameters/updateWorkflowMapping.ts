import type { IssueTypesWorkflowMapping } from '../models/index.js';

export interface UpdateWorkflowMapping extends IssueTypesWorkflowMapping {
  /** The ID of the workflow scheme. */
  id: number;
  /** The name of the workflow. */
  workflowName: string;
}
