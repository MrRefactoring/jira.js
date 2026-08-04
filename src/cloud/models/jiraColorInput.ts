import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraColorInputSchema = apiObject({
  name: z.string(),
});

export type JiraColorInput = z.infer<typeof JiraColorInputSchema>;
