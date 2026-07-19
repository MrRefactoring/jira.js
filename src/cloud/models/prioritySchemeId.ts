import { z } from 'zod';
import { apiObject } from '#/core';
import { TaskProgressJsonNodeSchema } from './taskProgressJsonNode';
/** The ID of a priority scheme. */

export const PrioritySchemeIdSchema = apiObject({
  /** The ID of the priority scheme. */
  id: z.string().optional(),
  task: TaskProgressJsonNodeSchema.optional(),
});

export type PrioritySchemeId = z.infer<typeof PrioritySchemeIdSchema>;
