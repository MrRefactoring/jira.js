import { z } from 'zod';
import { apiObject } from '#/core';

export const NotificationSchemeSchema = apiObject({
  description: z.string().optional(),
  expand: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  notificationSchemeEvents: z.record(z.string(), z.any()).optional(),
  self: z.string().optional(),
});

export type NotificationScheme = z.infer<typeof NotificationSchemeSchema>;
