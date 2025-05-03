import type { ProjectIssueTypes } from './projectIssueTypes';
import type { StatusScope } from './statusScope';

/** Details of a status. */
export interface JiraStatus {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  scope?: StatusScope;
  /** The category of the status. */
  statusCategory?: string;
  /** Projects and issue types where the status is used. Only available if the `usages` expand is requested. */
  usages?: ProjectIssueTypes[];
}
