import { z } from 'zod';
import { NotificationSchemeEventSchema } from './notificationSchemeEvent';

/** Details about a notification scheme. */
export const NotificationSchemeSchema = z.object({
  /** The description of the notification scheme. */
  description: z.string().optional(),
  /** Expand options that include additional notification scheme details in the response. */
  expand: z.string().optional(),
  /** The ID of the notification scheme. */
  id: z.number().int().optional(),
  /** The name of the notification scheme. */
  name: z.string().optional(),
  /** The notification events and associated recipients. */
  notificationSchemeEvents: z.array(NotificationSchemeEventSchema).optional(),
  /** The list of project IDs associated with the notification scheme. */
  projects: z.array(z.number().int()).optional(),
  /** The scope of the notification scheme. */
  scope: z.unknown().optional(),
  self: z.string().optional(),
});

export type NotificationScheme = z.infer<typeof NotificationSchemeSchema>;
