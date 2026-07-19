import { z } from 'zod';
import { apiObject } from '#/core';
/** ID of a registered webhook or error messages explaining why a webhook wasn't registered. */

export const RegisteredWebhookSchema = apiObject({
  /** The ID of the webhook. Returned if the webhook is created. */
  createdWebhookId: z.number().optional(),
  /** Error messages specifying why the webhook creation failed. */
  errors: z.array(z.string()).optional(),
});

export type RegisteredWebhook = z.infer<typeof RegisteredWebhookSchema>;
