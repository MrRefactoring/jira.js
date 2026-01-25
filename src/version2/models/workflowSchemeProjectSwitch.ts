import type { MappingsByIssueTypeOverride } from './mappingsByIssueTypeOverride';

/** Request to switch a project's workflow scheme */
export interface WorkflowSchemeProjectSwitch {
  /**
   * The mappings for migrating issues from old statuses to new statuses when switching from one workflow scheme to
   * another. This field is required if any statuses in the current project's workflows would no longer exist in the
   * target workflow scheme. Each mapping defines how to update issues from an old status to the corresponding new
   * status in the issue's new workflow.
   */
  mappingsByIssueTypeOverride?: MappingsByIssueTypeOverride[];
  /** The ID of the project to switch the workflow scheme for */
  projectId?: string;
  /** The ID of the target workflow scheme to switch to */
  targetSchemeId?: string;
}
