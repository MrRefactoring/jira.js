import { pageSchema, type Page } from './page';
import { WebhookSchema, type Webhook } from './webhook';

export const PageWebhookSchema = pageSchema(WebhookSchema);

/** @deprecated Use `Page<Webhook>`, which describes the same shape. This alias is removed in the next major version. */
export type PageWebhook = Page<Webhook>;
