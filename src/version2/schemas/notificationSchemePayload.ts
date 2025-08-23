import { z } from 'zod';
import { NotificationSchemeEventPayloadSchema } from './notificationSchemeEventPayload';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/**
 * The payload for creating a notification scheme. The user has to supply the ID for the default notification scheme.
 * For CMP this is provided in the project payload and should be left empty, for TMP it's provided using this payload
 */
export const NotificationSchemePayloadSchema = z.object({
  /** The description of the notification scheme */
  description: z.string().optional(),
  /** The name of the notification scheme */
  name: z.string().optional(),
  /** The events and notifications for the notification scheme */
  notificationSchemeEvents: z.array(NotificationSchemeEventPayloadSchema).optional(),
  /** The strategy to use when there is a conflict with an existing entity */
  onConflict: z.enum(['FAIL', 'USE', 'NEW']).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type NotificationSchemePayload = z.infer<typeof NotificationSchemePayloadSchema>;
