import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraDateTimeInputSchema = apiObject({
  formattedDateTime: z.string(),
});

export type JiraDateTimeInput = z.infer<typeof JiraDateTimeInputSchema>;
