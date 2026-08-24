import { z } from 'zod';
import { WebhookInputSchema } from '../models';

export const CreateWebhookSchema = z.object(WebhookInputSchema.shape);

export type CreateWebhook = z.input<typeof CreateWebhookSchema>;
