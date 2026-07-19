import { z } from 'zod';
import { apiObject } from '#/core';

export const NotificationSchemeAndProjectMappingJsonSchema = apiObject({
  notificationSchemeId: z.string().optional(),
  projectId: z.string().optional(),
});

export type NotificationSchemeAndProjectMappingJson = z.infer<typeof NotificationSchemeAndProjectMappingJsonSchema>;
