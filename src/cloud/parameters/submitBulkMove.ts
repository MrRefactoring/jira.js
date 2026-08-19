import { z } from 'zod';
import { IssueBulkMovePayloadSchema } from '../models';

export const SubmitBulkMoveSchema = z.object(IssueBulkMovePayloadSchema.shape);

export type SubmitBulkMove = z.input<typeof SubmitBulkMoveSchema>;
