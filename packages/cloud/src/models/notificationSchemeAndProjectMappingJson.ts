import { z } from 'zod';

export const NotificationSchemeAndProjectMappingJsonSchema = z.object({
  notificationSchemeId: z.string().optional(),
  projectId: z.string().optional(),
});

export type NotificationSchemeAndProjectMappingJson = z.infer<typeof NotificationSchemeAndProjectMappingJsonSchema>;
