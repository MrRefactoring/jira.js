import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraUrlFieldSchema = apiObject({
  fieldId: z.string(),
  url: z.string(),
});

export type JiraUrlField = z.infer<typeof JiraUrlFieldSchema>;
