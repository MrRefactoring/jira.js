import { z } from 'zod';
import { AddNotificationsDetailsSchema } from '../models';

export const AddNotificationsSchema = z.object(AddNotificationsDetailsSchema.shape).extend({
  /** The ID of the notification scheme. */
  id: z.string(),
});

export type AddNotifications = z.input<typeof AddNotificationsSchema>;
