import { z } from 'zod';
import { IssueBulkEditPayloadSchema } from '../models';

export const SubmitBulkEditSchema = z.object({}).extend(IssueBulkEditPayloadSchema.shape);

export type SubmitBulkEdit = z.input<typeof SubmitBulkEditSchema>;
