import { z } from 'zod';
import { NotificationSchema } from '../models';

export const NotifySchema = z
  .object({
    /** ID or key of the issue that the notification is sent for. */
    issueIdOrKey: z.string(),
  })
  .extend(NotificationSchema.shape);

export type Notify = z.input<typeof NotifySchema>;
