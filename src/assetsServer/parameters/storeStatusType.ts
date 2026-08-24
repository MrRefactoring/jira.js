import { z } from 'zod';
import { StatusTypeSchema } from '../models';

export const StoreStatusTypeSchema = z.object(StatusTypeSchema.shape);

export type StoreStatusType = z.input<typeof StoreStatusTypeSchema>;
