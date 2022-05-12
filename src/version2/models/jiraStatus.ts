import { ProjectIssueTypes } from './projectIssueTypes';
import { StatusScope } from './statusScope';

/** Details of a status. */
export interface JiraStatus {
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  /** The category of the status. */
  statusCategory?: string;
  scope?: StatusScope;
  /** The description of the status. */
  description?: string;
  /** Projects and issue types where the status is used. Only available if the `usages` expand is requested. */
  usages?: ProjectIssueTypes[];
}
