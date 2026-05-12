import { z } from 'zod';
import { ContainerForWebhookIDsSchema } from '../models';

export const RefreshWebhooksSchema = z.object({}).extend(ContainerForWebhookIDsSchema.shape);

export type RefreshWebhooks = z.input<typeof RefreshWebhooksSchema>;
