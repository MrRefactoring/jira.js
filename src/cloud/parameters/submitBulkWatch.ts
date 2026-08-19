import { z } from 'zod';
import { IssueBulkWatchOrUnwatchPayloadSchema } from '../models';

export const SubmitBulkWatchSchema = z.object(IssueBulkWatchOrUnwatchPayloadSchema.shape);

export type SubmitBulkWatch = z.input<typeof SubmitBulkWatchSchema>;
