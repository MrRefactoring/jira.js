import { z } from 'zod';
import { RegisteredWebhookSchema } from './registeredWebhook';

/** Container for a list of registered webhooks. Webhook details are returned in the same order as the request. */
export const ContainerForRegisteredWebhooksSchema = z.object({
  /** A list of registered webhooks. */
  webhookRegistrationResult: z.array(RegisteredWebhookSchema).optional(),
});

export type ContainerForRegisteredWebhooks = z.infer<typeof ContainerForRegisteredWebhooksSchema>;
