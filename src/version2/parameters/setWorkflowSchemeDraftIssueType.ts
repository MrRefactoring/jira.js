import { IssueTypeWorkflowMapping } from '../models';

export interface SetWorkflowSchemeDraftIssueType extends IssueTypeWorkflowMapping {
  /** The ID of the workflow scheme that the draft belongs to. */
  id: number;
  /** The ID of the issue type. */
  issueType: string;

  /** Details about the mapping between an issue type and a workflow. */
  body?: {
    /** The ID of the issue type. Not required if updating the issue type-workflow mapping. */
    issueType?: string;
    /** The name of the workflow. */
    workflow?: string;
    /**
     * Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the
     * workflow scheme cannot be edited. Defaults to `false`. Only applicable when updating the workflow-issue types mapping.
     */
    updateDraftIfNeeded?: boolean;
  };
}
