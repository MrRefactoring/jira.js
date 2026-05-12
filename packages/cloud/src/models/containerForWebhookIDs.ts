import { z } from 'zod';

/** Container for a list of webhook IDs. */
export const ContainerForWebhookIDsSchema = z.object({
  /** A list of webhook IDs. */
  webhookIds: z.array(z.number()),
});

export type ContainerForWebhookIDs = z.infer<typeof ContainerForWebhookIDsSchema>;
