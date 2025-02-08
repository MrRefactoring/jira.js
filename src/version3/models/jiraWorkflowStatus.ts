import { WorkflowScope } from './workflowScope';
import { ProjectIssueTypes } from './projectIssueTypes';

/** Details of a status. */
export interface JiraWorkflowStatus {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  scope?: WorkflowScope;
  /** The category of the status. */
  statusCategory?: 'TODO' | 'IN_PROGRESS' | 'DONE' | string;
  /** The reference of the status. */
  statusReference?: string;
  /**
   * The `statuses.usages` expand is an optional parameter that can be used when reading and updating statuses in Jira.
   * It provides additional information about the projects and issue types associated with the requested statuses.
   */
  usages?: ProjectIssueTypes[];
}
