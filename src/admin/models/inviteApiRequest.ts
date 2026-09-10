import { z } from 'zod';
import { apiObject } from '#/core';
import { RoleAssociationSchema } from './roleAssociation';

export const InviteApiRequestSchema = apiObject({
  email: z.string(),
  permissionRule: RoleAssociationSchema.optional(),
  sendNotification: z.boolean().optional(),
  notificationText: z.string().optional(),
});

export type InviteApiRequest = z.infer<typeof InviteApiRequestSchema>;
