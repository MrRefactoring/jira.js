import { z } from 'zod';

export const RefreshWebhooksParametersSchema = z.object({
  /** A list of webhook IDs. */
  webhookIds: z.array(z.number().int()),
});

export type RefreshWebhooksParameters = z.infer<typeof RefreshWebhooksParametersSchema>;
