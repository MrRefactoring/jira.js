import { z } from 'zod';
import { NotificationJsonSchema } from '../models';

export const NotifySchema = z.object(NotificationJsonSchema.shape).extend({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type Notify = z.input<typeof NotifySchema>;
