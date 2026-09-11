import { z } from 'zod';
import { WebhookInputSchema } from '../models';

export const UpdateWebhookSchema = z.object(WebhookInputSchema.shape).extend({
  /** The id of the webhook. */
  webhookId: z.number(),
});

export type UpdateWebhook = z.input<typeof UpdateWebhookSchema>;
