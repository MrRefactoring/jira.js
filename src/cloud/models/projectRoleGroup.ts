import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of the group associated with the role. */

export const ProjectRoleGroupSchema = apiObject({
  /** The display name of the group. */
  displayName: z.string().optional(),
  /** The ID of the group. */
  groupId: z.string().optional(),
  /** The name of the group. As a group's name can change, use of `groupId` is recommended to identify the group. */
  name: z.string().optional(),
});

export type ProjectRoleGroup = z.infer<typeof ProjectRoleGroupSchema>;
