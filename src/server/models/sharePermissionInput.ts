import { z } from 'zod';
import { apiObject } from '#/core';

export const SharePermissionInputSchema = apiObject({
  edit: z.boolean().optional(),
  groupname: z.string().optional(),
  projectId: z.string().optional(),
  projectRoleId: z.string().optional(),
  type: z.string().optional(),
  userKey: z.string().optional(),
  view: z.boolean().optional(),
});

export type SharePermissionInput = z.infer<typeof SharePermissionInputSchema>;
