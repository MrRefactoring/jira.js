import { z } from 'zod';
import { WebhookRegistrationDetailsSchema } from '../models';

export const RegisterDynamicWebhooksSchema = z.object({}).extend(WebhookRegistrationDetailsSchema.shape);

export type RegisterDynamicWebhooks = z.input<typeof RegisterDynamicWebhooksSchema>;
