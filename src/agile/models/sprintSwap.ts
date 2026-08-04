import { z } from 'zod';
import { apiObject } from '#/core';

export const SprintSwapSchema = apiObject({
  sprintToSwapWith: z.number().optional(),
});

export type SprintSwap = z.infer<typeof SprintSwapSchema>;
