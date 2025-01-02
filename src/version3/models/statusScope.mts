import type { ProjectId } from './projectId.mjs';

/** The scope of the status. */
export interface StatusScope {
  /** The scope of the status. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type: string;
  project?: ProjectId;
}
