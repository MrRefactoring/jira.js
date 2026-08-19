import { z } from 'zod';
import { ContainerForWebhookIDsSchema } from '../models';

export const RefreshWebhooksSchema = z.object(ContainerForWebhookIDsSchema.shape);

export type RefreshWebhooks = z.input<typeof RefreshWebhooksSchema>;
