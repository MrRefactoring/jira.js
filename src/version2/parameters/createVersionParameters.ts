import { z } from 'zod';
import { VersionApproverSchema } from './versionApprover';
import { SimpleLinkSchema } from './simpleLink';

export const CreateVersionParametersSchema = z.object({
  /** If the expand option `approvers` is used, returns a list containing the approvers for this version. */
  approvers: z.array(VersionApproverSchema).optional(),
  /** Indicates that the version is archived. Optional when creating or updating a version. */
  archived: z.boolean().optional(),
  /** The description of the version. Optional when creating or updating a version. The maximum size is 16,384 bytes. */
  description: z.string().optional(),
  /** If the expand option `driver` is used, returns the Atlassian account ID of the driver. */
  driver: z.string().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about version in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `operations` Returns the list of operations available for this version.
   * - `issuesstatus` Returns the count of issues in this version for each of the status categories _to do_, _in
   *   progress_, _done_, and _unmapped_. The _unmapped_ property contains a count of issues with a status other than
   *   _to do_, _in progress_, and _done_.
   * - `driver` Returns the Atlassian account ID of the version driver.
   * - `approvers` Returns a list containing approvers for this version.
   *
   * Optional for create and update.
   */
  expand: z.string().optional(),
  /** The ID of the version. */
  id: z.string().optional(),
  /**
   * If the expand option `issuesstatus` is used, returns the count of issues in this version for each of the status
   * categories _to do_, _in progress_, _done_, and _unmapped_. The _unmapped_ property contains a count of issues with
   * a status other than _to do_, _in progress_, and _done_.
   */
  issuesStatusForFixVersion: z.unknown().optional(),
  /**
   * The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not
   * applicable when creating a version. Optional when updating a version.
   */
  moveUnfixedIssuesTo: z.string().optional(),
  /**
   * The unique name of the version. Required when creating a version. Optional when updating a version. The maximum
   * length is 255 characters.
   */
  name: z.string().optional(),
  /** If the expand option `operations` is used, returns the list of operations available for this version. */
  operations: z.array(SimpleLinkSchema).optional(),
  /** Indicates that the version is overdue. */
  overdue: z.boolean().optional(),
  /** Deprecated. Use `projectId`. */
  project: z.string().optional(),
  /**
   * The ID of the project to which this version is attached. Required when creating a version. Not applicable when
   * updating a version.
   */
  projectId: z.number().int().optional(),
  /**
   * The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a
   * version.
   */
  releaseDate: z.string().datetime().optional(),
  /**
   * Indicates that the version is released. If the version is released a request to release again is ignored. Not
   * applicable when creating a version. Optional when updating a version.
   */
  released: z.boolean().optional(),
  /** The URL of the version. */
  self: z.string().optional(),
  /**
   * The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a
   * version.
   */
  startDate: z.string().datetime().optional(),
  /**
   * The date on which work on this version is expected to finish, expressed in the instance's _Day/Month/Year Format_
   * date format.
   */
  userReleaseDate: z.string().optional(),
  /**
   * The date on which work on this version is expected to start, expressed in the instance's _Day/Month/Year Format_
   * date format.
   */
  userStartDate: z.string().optional(),
});

export type CreateVersionParameters = z.infer<typeof CreateVersionParametersSchema>;
