import { z } from 'zod';
import { ContainerForWebhookIDsSchema } from '../models';

export const DeleteWebhookByIdSchema = z.object(ContainerForWebhookIDsSchema.shape);

export type DeleteWebhookById = z.input<typeof DeleteWebhookByIdSchema>;
