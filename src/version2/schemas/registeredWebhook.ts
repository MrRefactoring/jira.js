import { z } from 'zod';

/** ID of a registered webhook or error messages explaining why a webhook wasn't registered. */
export const RegisteredWebhookSchema = z.object({
  /** The ID of the webhook. Returned if the webhook is created. */
  createdWebhookId: z.number().int().optional(),
  /** Error messages specifying why the webhook creation failed. */
  errors: z.array(z.string()).optional(),
});

export type RegisteredWebhook = z.infer<typeof RegisteredWebhookSchema>;
