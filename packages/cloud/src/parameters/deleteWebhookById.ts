import { z } from 'zod';
import { ContainerForWebhookIDsSchema } from '../models';

export const DeleteWebhookByIdSchema = z.object({}).extend(ContainerForWebhookIDsSchema.shape);

export type DeleteWebhookById = z.input<typeof DeleteWebhookByIdSchema>;
