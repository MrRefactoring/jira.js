import { z } from 'zod';
import { IssueLinkTypeResetOrderRequestSchema } from '../models';

export const ResetOrderSchema = z.object(IssueLinkTypeResetOrderRequestSchema.shape);

export type ResetOrder = z.input<typeof ResetOrderSchema>;
