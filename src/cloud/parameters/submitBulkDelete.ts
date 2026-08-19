import { z } from 'zod';
import { IssueBulkDeletePayloadSchema } from '../models';

export const SubmitBulkDeleteSchema = z.object(IssueBulkDeletePayloadSchema.shape);

export type SubmitBulkDelete = z.input<typeof SubmitBulkDeleteSchema>;
