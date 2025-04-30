import type { ProjectId } from './projectId';

/** Projects and issue types where the status is used. Only available if the `usages` expand is requested. */
export interface ProjectIssueTypes {
  /** IDs of the issue types */
  issueTypes?: string[];
  project?: ProjectId;
}
