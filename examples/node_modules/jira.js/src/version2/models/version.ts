import type { VersionApprover } from './versionApprover';
import type { VersionIssuesStatus } from './versionIssuesStatus';
import type { SimpleLink } from './simpleLink';

/** Details about a project version. */
export interface Version {
  /** If the expand option `approvers` is used, returns a list containing the approvers for this version. */
  approvers?: VersionApprover[];
  /** Indicates that the version is archived. Optional when creating or updating a version. */
  archived?: boolean;
  /** The description of the version. Optional when creating or updating a version. The maximum size is 16,384 bytes. */
  description?: string;
  /** If the expand option `driver` is used, returns the Atlassian account ID of the driver. */
  driver?: string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about version in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `operations` Returns the list of operations available for this version.
   * - `issuesstatus` Returns the count of issues in this version for each of the status categories _to do_, _in
   *   progress_, _done_, and _unmapped_. The _unmapped_ property contains a count of issues with a status other than
   *   _to do_, _in progress_, and _done_.
   *
   * Optional for create and update.
   */
  expand?: 'operations' | 'issuesstatus' | ('operations' | 'issuesstatus')[] | string | string[];
  /** The URL of the version. */
  self?: string;
  /** The ID of the version. */
  id?: string;
  /**
   * The unique name of the version. Required when creating a version. Optional when updating a version. The maximum
   * length is 255 characters.
   */
  name?: string;
  /**
   * Indicates that the version is released. If the version is released a request to release again is ignored. Not
   * applicable when creating a version. Optional when updating a version.
   */
  released?: boolean;
  /**
   * The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a
   * version.
   */
  startDate?: string;
  /**
   * The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a
   * version.
   */
  releaseDate?: string;
  /** Indicates that the version is overdue. */
  overdue?: boolean;
  /**
   * The date on which work on this version is expected to start, expressed in the instance's _Day/Month/Year Format_
   * date format.
   */
  userStartDate?: string;
  /**
   * The date on which work on this version is expected to finish, expressed in the instance's _Day/Month/Year Format_
   * date format.
   */
  userReleaseDate?: string;
  /**
   * The ID of the project to which this version is attached. Required when creating a version. Not applicable when
   * updating a version.
   */
  projectId: string | number;
  /**
   * The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not
   * applicable when creating a version. Optional when updating a version.
   */
  moveUnfixedIssuesTo?: string;
  /** If the expand option `operations` is used, returns the list of operations available for this version. */
  operations?: SimpleLink[];
  issuesStatusForFixVersion?: VersionIssuesStatus;
}
