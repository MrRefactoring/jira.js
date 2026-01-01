import type { WorkflowHistoryItem } from './workflowHistoryItem';

/** A list of workflow history entries. */
export interface WorkflowHistoryListResponse {
  entries?: WorkflowHistoryItem[];
}
