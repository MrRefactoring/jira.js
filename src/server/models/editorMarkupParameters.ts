import { z } from 'zod';
import { apiObject } from '#/core';

export const EditorMarkupParametersSchema = apiObject({
  fieldId: z.string(),
  fieldName: z.string().optional(),
  issueKey: z.string().optional(),
  value: z.string().optional(),
});

export type EditorMarkupParameters = z.infer<typeof EditorMarkupParametersSchema>;
