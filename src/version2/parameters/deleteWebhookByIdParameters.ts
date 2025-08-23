import { z } from 'zod';

export const DeleteWebhookByIdParametersSchema = z.object({
  /** A list of webhook IDs. */
  webhookIds: z.array(z.number().int()),
});

export type DeleteWebhookByIdParameters = z.infer<typeof DeleteWebhookByIdParametersSchema>;
