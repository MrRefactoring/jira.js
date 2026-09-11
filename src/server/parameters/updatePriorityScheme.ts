import { z } from 'zod';
import { PrioritySchemeUpdateSchema } from '../models';

export const UpdatePrioritySchemeSchema = z.object(PrioritySchemeUpdateSchema.shape).extend({
  /** Id of the priority scheme to update */
  schemeId: z.number(),
});

export type UpdatePriorityScheme = z.input<typeof UpdatePrioritySchemeSchema>;
