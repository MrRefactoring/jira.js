import type { JiraWorkflowStatus } from './jiraWorkflowStatus';
import type { JiraWorkflow } from './jiraWorkflow';

/** Page of items, including workflows and related statuses. */
export interface WorkflowSearchResponse {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** List of statuses. */
  statuses?: JiraWorkflowStatus[];
  /** The number of items returned. */
  total?: number;
  /** List of workflows. */
  values?: JiraWorkflow[];
}
