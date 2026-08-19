import { z } from 'zod';
import { IssueBulkTransitionPayloadSchema } from '../models';

export const SubmitBulkTransitionSchema = z.object(IssueBulkTransitionPayloadSchema.shape);

export type SubmitBulkTransition = z.input<typeof SubmitBulkTransitionSchema>;
