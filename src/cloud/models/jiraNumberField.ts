import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraNumberFieldSchema = apiObject({
  fieldId: z.string(),
  value: z.number().optional(),
});

export type JiraNumberField = z.infer<typeof JiraNumberFieldSchema>;
