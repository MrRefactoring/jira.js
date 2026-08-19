import { z } from 'zod';
import { StatusUpdateRequestSchema } from '../models';

export const UpdateStatusesSchema = z.object(StatusUpdateRequestSchema.shape);

export type UpdateStatuses = z.input<typeof UpdateStatusesSchema>;
