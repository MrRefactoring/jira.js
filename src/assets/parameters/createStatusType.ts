import { z } from 'zod';
import { StatusInSchema } from '../models';

export const CreateStatusTypeSchema = z.object(StatusInSchema.shape);

export type CreateStatusType = z.input<typeof CreateStatusTypeSchema>;
