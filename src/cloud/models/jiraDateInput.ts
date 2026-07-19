import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraDateInputSchema = apiObject({
  formattedDate: z.string(),
});

export type JiraDateInput = z.infer<typeof JiraDateInputSchema>;
