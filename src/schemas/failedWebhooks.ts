import { FailedWebhook } from './failedWebhook';

export interface FailedWebhooks {
    values: FailedWebhook[];
    maxResults: number;
    next?: string;
}
