import { WebhookDetails } from './webhookDetails';

export interface WebhookRegistrationDetails {
    webhooks: WebhookDetails[];
    url: string;
}
