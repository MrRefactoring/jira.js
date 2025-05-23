import type { WebhookDetails } from './webhookDetails';

/** Details of webhooks to register. */
export interface WebhookRegistrationDetails {
  /**
   * The URL that specifies where to send the webhooks. This URL must use the same base URL as the Connect app. Only a
   * single URL per app is allowed to be registered.
   */
  url: string;
  /** A list of webhooks. */
  webhooks: WebhookDetails[];
}
