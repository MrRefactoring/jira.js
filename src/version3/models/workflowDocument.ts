import type { WorkflowLayout } from './workflowLayout';
import type { WorkflowScope } from './workflowScope';
import type { WorkflowReferenceStatus } from './workflowReferenceStatus';
import type { WorkflowTransitions } from './workflowTransitions';
import type { DocumentVersion } from './documentVersion';

/** The workflow stored for the specified version. */
export interface WorkflowDocument {
  created?: string;
  description?: string;
  id?: string;
  lastUpdateAuthorAAID?: string;
  loopedTransitionContainerLayout?: WorkflowLayout;
  name?: string;
  scope?: WorkflowScope;
  startPointLayout?: WorkflowLayout;
  statuses?: WorkflowReferenceStatus[];
  transitions?: WorkflowTransitions[];
  updated?: string;
  version?: DocumentVersion;
}
