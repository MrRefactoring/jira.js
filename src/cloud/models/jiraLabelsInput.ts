import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraLabelsInputSchema = apiObject({
  name: z.string(),
});

export type JiraLabelsInput = z.infer<typeof JiraLabelsInputSchema>;
