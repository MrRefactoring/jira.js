import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupLabelSchema } from './groupLabel';

export const GroupSuggestionSchema = apiObject({
  html: z.string().optional(),
  labels: z.array(GroupLabelSchema).optional(),
  name: z.string().optional(),
});

export type GroupSuggestion = z.infer<typeof GroupSuggestionSchema>;
