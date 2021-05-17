import { Scope } from './scope';

/**
 * Details about a workflow. */
export interface DeprecatedWorkflow {
  /** The name of the workflow. */
  name?: string;
  /** The description of the workflow. */
  description?: string;
  /** The datetime the workflow was last modified. */
  lastModifiedDate?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  lastModifiedUser?: string;
  /** The account ID of the user that last modified the workflow. */
  lastModifiedUserAccountId?: string;
  /** The number of steps included in the workflow. */
  steps?: number;
  scope?: Scope;
  default?: boolean;
}
