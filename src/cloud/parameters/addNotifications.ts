import { z } from 'zod';
import { AddNotificationsDetailsSchema } from '../models';

export const AddNotificationsSchema = z
  .object({
    /** The ID of the notification scheme. */
    id: z.string(),
  })
  .extend(AddNotificationsDetailsSchema.shape);

export type AddNotifications = z.input<typeof AddNotificationsSchema>;
