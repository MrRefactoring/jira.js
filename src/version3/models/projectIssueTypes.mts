import type { ProjectId } from './projectId.mjs';

/** Projects and issue types where the status is used. Only available if the `usages` expand is requested. */
export interface ProjectIssueTypes {
  project?: ProjectId;
  /** IDs of the issue types */
  issueTypes?: string[];
}
