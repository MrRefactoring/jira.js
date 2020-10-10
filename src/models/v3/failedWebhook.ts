export interface FailedWebhook {
  id: string;
  body?: string;
  url: string;
  failureTime: number;
}
