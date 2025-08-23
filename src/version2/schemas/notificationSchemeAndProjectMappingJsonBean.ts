import { z } from 'zod';

export const NotificationSchemeAndProjectMappingJsonBeanSchema = z.object({
  notificationSchemeId: z.string().optional(),
  projectId: z.string().optional(),
});

export type NotificationSchemeAndProjectMappingJsonBean = z.infer<
  typeof NotificationSchemeAndProjectMappingJsonBeanSchema
>;
