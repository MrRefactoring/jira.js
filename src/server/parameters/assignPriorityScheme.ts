import { z } from 'zod';
import { IdSchema } from '../models';

export const AssignPrioritySchemeSchema = z.object(IdSchema.shape).extend({
  /** Key or id of the project */
  projectKeyOrId: z.string(),
});

export type AssignPriorityScheme = z.input<typeof AssignPrioritySchemeSchema>;
