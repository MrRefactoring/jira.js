import { z } from 'zod';

export const AssignPermissionSchemeParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectKeyOrId: z.string(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Note that permissions are included when
   * you specify any value. Expand options include:
   *
   * - `all` Returns all expandable information.
   * - `field` Returns information about the custom field granted the permission.
   * - `group` Returns information about the group that is granted the permission.
   * - `permissions` Returns all permission grants for each permission scheme.
   * - `projectRole` Returns information about the project role granted the permission.
   * - `user` Returns information about the user who is granted the permission.
   */
  expand: z.string().optional(),
  /**
   * The ID of the permission scheme to associate with the project. Use the [Get all permission
   * schemes](#api-rest-api-2-permissionscheme-get) resource to get a list of permission scheme IDs.
   */
  id: z.number().int(),
});

export type AssignPermissionSchemeParameters = z.infer<typeof AssignPermissionSchemeParametersSchema>;
