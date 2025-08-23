import { z } from 'zod';
import { WebhookDetailsSchema } from './webhookDetails';

/** Details of webhooks to register. */
export const WebhookRegistrationDetailsSchema = z.object({
  /**
   * The URL that specifies where to send the webhooks. This URL must use the same base URL as the Connect app. Only a
   * single URL per app is allowed to be registered.
   */
  url: z.string(),
  /** A list of webhooks. */
  webhooks: z.array(WebhookDetailsSchema),
});

export type WebhookRegistrationDetails = z.infer<typeof WebhookRegistrationDetailsSchema>;
