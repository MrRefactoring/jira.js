import { z } from 'zod';
import { ReorderIssuePrioritiesSchema } from '../models';

export const MovePrioritiesSchema = z.object({}).extend(ReorderIssuePrioritiesSchema.shape);

export type MovePriorities = z.input<typeof MovePrioritiesSchema>;
