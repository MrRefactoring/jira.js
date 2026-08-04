import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraSelectedOptionFieldSchema = apiObject({
  optionId: z.number().optional(),
});

export type JiraSelectedOptionField = z.infer<typeof JiraSelectedOptionFieldSchema>;
