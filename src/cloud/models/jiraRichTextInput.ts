import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraRichTextInputSchema = apiObject({
  adfValue: z.record(z.string(), z.any()).optional(),
});

export type JiraRichTextInput = z.infer<typeof JiraRichTextInputSchema>;
