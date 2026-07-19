import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraSingleLineTextFieldSchema = apiObject({
  fieldId: z.string(),
  text: z.string(),
});

export type JiraSingleLineTextField = z.infer<typeof JiraSingleLineTextFieldSchema>;
