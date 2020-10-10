import { Webhook } from './webhook';

export interface PageBeanWebhook {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: Webhook[];
}
