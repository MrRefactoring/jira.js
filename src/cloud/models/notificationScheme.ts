import { z } from 'zod';
import { apiObject } from '#/core';
import { NotificationSchemeEventSchema } from './notificationSchemeEvent';
import { ScopeSchema } from './scope';
/** Details about a notification scheme. */

export const NotificationSchemeSchema = apiObject({
  /** The description of the notification scheme. */
  description: z.string().optional(),
  /** Expand options that include additional notification scheme details in the response. */
  expand: z.string().optional(),
  /** The ID of the notification scheme. */
  id: z.number().optional(),
  /** The name of the notification scheme. */
  name: z.string().optional(),
  /** The notification events and associated recipients. */
  notificationSchemeEvents: z.array(NotificationSchemeEventSchema).optional(),
  /** The list of project IDs associated with the notification scheme. */
  projects: z.array(z.number()).optional(),
  scope: ScopeSchema.optional(),
  self: z.string().optional(),
});

export type NotificationScheme = z.infer<typeof NotificationSchemeSchema>;
