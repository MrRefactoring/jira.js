import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraPriorityFieldSchema = apiObject({
  priorityId: z.string(),
});

export type JiraPriorityField = z.infer<typeof JiraPriorityFieldSchema>;
