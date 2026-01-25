import type { WorkflowProjectIdScope } from './workflowProjectIdScope';

/** The scope of the workflow. */
export interface WorkflowPreviewScope {
  project?: WorkflowProjectIdScope;
  /** The scope of the workflow. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type?: 'PROJECT' | 'GLOBAL' | string;
}
