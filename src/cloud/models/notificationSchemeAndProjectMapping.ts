import { z } from 'zod';
import { apiObject } from '#/core';

export const NotificationSchemeAndProjectMappingSchema = apiObject({
  notificationSchemeId: z.string().optional(),
  projectId: z.string().optional(),
});

export type NotificationSchemeAndProjectMapping = z.infer<typeof NotificationSchemeAndProjectMappingSchema>;
