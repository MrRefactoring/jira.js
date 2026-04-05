import { z } from 'zod';
import { TaskProgressJsonNodeSchema } from '#/models/taskProgressJsonNode';

/** The ID of a priority scheme. */
export const PrioritySchemeIdSchema = z.object({
  /** The ID of the priority scheme. */
  id: z.string().optional(),
  task: TaskProgressJsonNodeSchema.optional(),
});

export type PrioritySchemeId = z.infer<typeof PrioritySchemeIdSchema>;
