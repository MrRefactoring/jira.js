import { z } from 'zod';
import { apiObject } from '#/core';
import { NotificationSchemeSchema } from './notificationScheme';

export const PageOfNotificationSchemesSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  nextPage: z.url().optional(),
  self: z.url().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(NotificationSchemeSchema).optional(),
});

export type PageOfNotificationSchemes = z.infer<typeof PageOfNotificationSchemesSchema>;
