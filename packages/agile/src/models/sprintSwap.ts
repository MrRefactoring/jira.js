import { z } from 'zod';

export const SprintSwapSchema = z.object({
  sprintToSwapWith: z.number().optional(),
});

export type SprintSwap = z.infer<typeof SprintSwapSchema>;
