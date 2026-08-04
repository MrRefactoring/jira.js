import { z } from 'zod';
import { apiObject } from '#/core';
/** Container for a list of webhook IDs. */

export const ContainerForWebhookIDsSchema = apiObject({
  /** A list of webhook IDs. */
  webhookIds: z.array(z.number()),
});

export type ContainerForWebhookIDs = z.infer<typeof ContainerForWebhookIDsSchema>;
