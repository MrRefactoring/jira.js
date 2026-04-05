import { z } from 'zod';
import { IssueBulkTransitionPayloadSchema } from '../models';

export const SubmitBulkTransitionSchema = z.object({}).extend(IssueBulkTransitionPayloadSchema.shape);

export type SubmitBulkTransition = z.input<typeof SubmitBulkTransitionSchema>;
