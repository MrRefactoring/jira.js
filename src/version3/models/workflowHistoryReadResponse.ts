import type { WorkflowDocumentStatus } from './workflowDocumentStatus';
import type { WorkflowDocument } from './workflowDocument';

/** The specified workflow version read from history. */
export interface WorkflowHistoryReadResponse {
  statuses?: WorkflowDocumentStatus[];
  workflows?: WorkflowDocument[];
}
