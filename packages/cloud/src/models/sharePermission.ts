import { z } from 'zod';
import { GroupNameSchema } from '#/models/groupName';
import { ProjectSchema } from '#/models/project';
import { ProjectRoleSchema } from '#/models/projectRole';
import { DashboardUserSchema } from '#/models/dashboardUser';

/** Details of a share permission for the filter. */
export const SharePermissionSchema = z.object({
  group: GroupNameSchema.optional(),
  /** The unique identifier of the share permission. */
  id: z.number().optional(),
  project: ProjectSchema.optional(),
  role: ProjectRoleSchema.optional(),
  /**
   * The type of share permission:
   *
   * - `user` Shared with a user.
   * - `group` Shared with a group. If set in a request, then specify `sharePermission.group` as well.
   * - `project` Shared with a project. If set in a request, then specify `sharePermission.project` as well.
   * - `projectRole` Share with a project role in a project. This value is not returned in responses. It is used in
   *   requests, where it needs to be specify with `projectId` and `projectRoleId`.
   * - `global` Shared globally. If set in a request, no other `sharePermission` properties need to be specified.
   * - `loggedin` Shared with all logged-in users. Note: This value is set in a request by specifying `authenticated` as
   *   the `type`.
   * - `project-unknown` Shared with a project that the user does not have access to. Cannot be set in a request.
   */
  type: z.enum(['user', 'group', 'project', 'projectRole', 'global', 'loggedin', 'authenticated', 'project-unknown']),
  user: DashboardUserSchema.optional(),
});

export type SharePermission = z.infer<typeof SharePermissionSchema>;
