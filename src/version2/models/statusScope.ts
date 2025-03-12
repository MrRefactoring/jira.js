import type { ProjectId } from './projectId';

/** The scope of the status. */
export interface StatusScope {
  project?: ProjectId;
  /** The scope of the status. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type: string;
}
