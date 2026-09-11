import { z } from 'zod';
import { apiObject } from '#/core';
import { NotificationSchemeEventSchema } from './notificationSchemeEvent';

export const NotificationSchemeSchema = apiObject({
  description: z.string().optional(),
  expand: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  notificationSchemeEvents: z.array(NotificationSchemeEventSchema).optional(),
  self: z.string().optional(),
});

export type NotificationScheme = z.infer<typeof NotificationSchemeSchema>;
