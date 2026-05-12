import { z } from 'zod';

export const JiraPriorityFieldSchema = z.object({
  priorityId: z.string(),
});

export type JiraPriorityField = z.infer<typeof JiraPriorityFieldSchema>;
