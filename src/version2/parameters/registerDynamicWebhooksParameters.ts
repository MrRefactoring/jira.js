import { z } from 'zod';
import { WebhookDetailsSchema } from './webhookDetails';

export const RegisterDynamicWebhooksParametersSchema = z.object({
  /**
   * The URL that specifies where to send the webhooks. This URL must use the same base URL as the Connect app. Only a
   * single URL per app is allowed to be registered.
   */
  url: z.string(),
  /** A list of webhooks. */
  webhooks: z.array(WebhookDetailsSchema),
});

export type RegisterDynamicWebhooksParameters = z.infer<typeof RegisterDynamicWebhooksParametersSchema>;
