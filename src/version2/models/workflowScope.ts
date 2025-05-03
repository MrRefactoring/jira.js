import type { ProjectId } from './projectId';

/** The scope of the workflow. */
export interface WorkflowScope {
  project?: ProjectId;
  /** The scope of the workflow. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type: string;
}
