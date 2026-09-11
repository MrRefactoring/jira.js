import { z } from 'zod';
import { apiObject } from '#/core';

export const NotificationSchemeEventSchema = apiObject({
  event: apiObject({
    id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
  notifications: z
    .array(
      apiObject({
        id: z.number().optional(),
        notificationType: z.string().optional(),
        parameter: z.string().optional(),
      }),
    )
    .optional(),
});

export type NotificationSchemeEvent = z.infer<typeof NotificationSchemeEventSchema>;
