import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraGroupInputSchema = apiObject({
  groupName: z.string(),
});

export type JiraGroupInput = z.infer<typeof JiraGroupInputSchema>;
