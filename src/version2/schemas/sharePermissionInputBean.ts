import { z } from 'zod';

export const SharePermissionInputBeanSchema = z.object({
  /** The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user. */
  accountId: z.string().optional(),
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian products.For example,
   * _952d12c3-5b5b-4d04-bb32-44d383afc4b2_. Cannot be provided with `groupname`.
   */
  groupId: z.string().optional(),
  /**
   * The name of the group to share the filter with. Set `type` to `group`. Please note that the name of a group is
   * mutable, to reliably identify a group use `groupId`.
   */
  groupname: z.string().optional(),
  /** The ID of the project to share the filter with. Set `type` to `project`. */
  projectId: z.string().optional(),
  /**
   * The ID of the project role to share the filter with. Set `type` to `projectRole` and the `projectId` for the
   * project that the role is in.
   */
  projectRoleId: z.string().optional(),
  /** The rights for the share permission. */
  rights: z.number().int().optional(),
  /**
   * The type of the share permission.Specify the type as follows:
   *
   * - `user` Share with a user.
   * - `group` Share with a group. Specify `groupname` as well.
   * - `project` Share with a project. Specify `projectId` as well.
   * - `projectRole` Share with a project role in a project. Specify `projectId` and `projectRoleId` as well.
   * - `global` Share globally, including anonymous users. If set, this type overrides all existing share permissions and
   *   must be deleted before any non-global share permissions is set.
   * - `authenticated` Share with all logged-in users. This shows as `loggedin` in the response. If set, this type
   *   overrides all existing share permissions and must be deleted before any non-global share permissions is set.
   */
  type: z.enum(['user', 'project', 'group', 'projectRole', 'global', 'authenticated']),
});

export type SharePermissionInputBean = z.infer<typeof SharePermissionInputBeanSchema>;
