import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraUserFieldSchema = apiObject({
  accountId: z.string(),
});

export type JiraUserField = z.infer<typeof JiraUserFieldSchema>;
