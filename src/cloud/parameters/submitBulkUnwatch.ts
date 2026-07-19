import { z } from 'zod';
import { IssueBulkWatchOrUnwatchPayloadSchema } from '../models';

export const SubmitBulkUnwatchSchema = z.object({}).extend(IssueBulkWatchOrUnwatchPayloadSchema.shape);

export type SubmitBulkUnwatch = z.input<typeof SubmitBulkUnwatchSchema>;
