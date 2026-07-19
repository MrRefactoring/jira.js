import { z } from 'zod';
import { apiObject } from '#/core';
/** The ID of a notification scheme. */

export const NotificationSchemeIdSchema = apiObject({
  /** The ID of a notification scheme. */
  id: z.string(),
});

export type NotificationSchemeId = z.infer<typeof NotificationSchemeIdSchema>;
