import { z } from 'zod';
import { StatusCreateRequestSchema } from '../models';

export const CreateStatusesSchema = z.object({}).extend(StatusCreateRequestSchema.shape);

export type CreateStatuses = z.input<typeof CreateStatusesSchema>;
