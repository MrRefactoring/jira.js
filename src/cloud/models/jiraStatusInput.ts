import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraStatusInputSchema = apiObject({
  statusId: z.string(),
});

export type JiraStatusInput = z.infer<typeof JiraStatusInputSchema>;
