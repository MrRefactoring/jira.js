import { WebhookDetails } from './webhookDetails';

/** Details of webhooks to register. */
export interface WebhookRegistrationDetails {
  /** A list of webhooks. */
  webhooks: WebhookDetails[];
  /** The URL that specifies where to send the webhooks. This URL must use the same base URL as the Connect app. */
  url: string;
}
